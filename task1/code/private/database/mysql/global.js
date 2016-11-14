'use strict'
const config = require( __dirname + '/../dbconfig.json').mysql

const db  = require('mysql');
const q   = require('q')

//Instance variable
var mysql = db.createPool({
  host     : config.host,
  user     : config.user
})

//Tables
let tables = {
  event: config.database + '.Event',
}

module.exports = {
  init: setupDatabase,
  instance: mysql,
  tables: tables
}

function createDatabase(){
  const deferred = q.defer()

  mysql.query('CREATE DATABASE IF NOT EXISTS '+config.database, function(err, result){
    if(err){
      console.error(err)
      deferred.reject(err)
    }else{
      deferred.resolve()
    }
  })

  return deferred.promise
}

function createEventTable(){
  const deferred = q.defer()
  const userTable = `Create Table ${tables.event} (
    id INT PRIMARY KEY AUTO_INCREMENT,
    created_at BIGINT,
    element_id varchar(128),
    element_type varchar(128),
    element_parent varchar(128),
    board_id int,
    data text,
    type enum('create', 'change', 'delete')
  )`
  mysql.query(userTable, function(err, result){
    if(err){
      if(err.code === 'ER_TABLE_EXISTS_ERROR'){
        updateEventTable()
          .then(deferred.resolve)
          .catch(deferred.reject)
      }else{
        console.error(err)
        deferred.reject(err)
      }
    }else{
      deferred.resolve()
    }
  })

  return deferred.promise
}

function updateEventTable(){
  const deferred = q.defer()
  const userTable = `Alter Table ${tables.event} `
  const columns = [
    'element_type varchar(128)',
    'element_parent varchar(128)',
  ]
  
  var promises = []
  for(var i = 0; i<columns.length; i++){
      promises.push(queryMysql(userTable + ' ADD ' + columns[i]))
  }
  
  q.allSettled(promises)
    .then(deferred.resolve)
    .catch(deferred.resolve)
  
  function queryMysql(query){
      const deferredInner = q.defer()
      mysql.query(query, function(err, result){
            deferred.resolve()
      })
      return deferredInner.promise
  }
  

  return deferred.promise
}



function setupDatabase () {
  return createDatabase()
    .then(createEventTable)
      
    .then( () => {
      console.log("Connected to Database")
      return mysql
    })
    .catch( err => {
      console.log("Database Error: ", err)
    })
}


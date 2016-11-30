'use strict'
const config = require( __dirname + '/../dbconfig.json').hdb

// const db  = require('mysql');
const q   = require('q')

//Instance variable
// var mysql = db.createPool({
//   host     : config.host,
//   user     : config.user
// })

var hdb    = require('hdb');
var client = hdb.createClient({
  host     : config.host,
  port     : config.port,
  user     : config.user,
  password : config.password
});

let tables = {
  persons: config.database + '.PERSONS_S',
}

function query(sqlQuery){
  const deferred = q.defer()

  client.exec(sqlQuery, function (err, rows) {
    if (err) {
      deferred.reject(err)
    }
    deferred.resolve(rows)
  });

  return deferred.promise
}

function connect(){
  const deferred = q.defer()

  client.on('error', function (err) {
    console.error('Network connection error', err);
  });
  client.connect(function (err) {
    if (err) {
      deferred.reject(err)
    }else{
      deferred.resolve()
    }
  });

  return deferred.promise
}

function disconnect(){
  client.end()
}

function setupDatabase () {
  return connect()
    // .then(createEventTable)
    .then( () => {
      console.log("Connected to Database")
    })
    .catch( err => {
      console.log("Database Error: ", err)
    })
}

module.exports = {
  init: setupDatabase,
  query: query,
  instance: client,
  tables: tables
}

'use strict'
const global = require(__dirname + '/global.js')
const q = require('q')

module.exports = {
  topEntries: getTopEntries,
}

function getTopEntries(limit) {
  const deferred = q.defer()
  if(!limit){
    limit = 10
  }
  let query = `select * from ${global.tables.persons} LIMIT ${limit}`

  global.query(query)
    .then(result => {
      deferred.resolve(result)
    })
    .catch( deferred.reject )

  return deferred.promise
}


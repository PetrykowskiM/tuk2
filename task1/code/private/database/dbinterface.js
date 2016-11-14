'use strict'
const dbPath = './mysql'
const dep_dbPath = './compatibility'

//import necessary modules
const global = require( dbPath + '/global.js')
const persons = require( dbPath + '/persons.js')

module.exports = {
  init: () => {
    return global.init()
  },
  getTopEntries: persons.topEntries,                // @Param (limit) -> [persons]
}



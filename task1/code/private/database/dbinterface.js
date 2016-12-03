'use strict'
const dbPath = './hdb'
const dep_dbPath = './compatibility'

//import necessary modules
const global = require( dbPath + '/global.js')
const persons = require( dbPath + '/persons.js')

module.exports = {
  init: () => {
    return global.init()
  },
  getTopEntries: persons.topEntries,  // @Param (limit) -> [persons]
  getBabies: persons.babies,
  getBmi: persons.bmi,
  getOldest: persons.oldest,
  getMostDiverseOrSimiliar: persons.diverseOrSimiliar,
  getPyramid: persons.pyramid,
  getDensity: persons.density
}

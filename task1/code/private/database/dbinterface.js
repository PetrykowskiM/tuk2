'use strict'
const dbPath = './mysql'
const dep_dbPath = './compatibility'

//import necessary modules
const global = require( dbPath + '/global.js')
const event = require( dbPath + '/event.js')

const dep_event = require( dep_dbPath + '/event.js')
const dep_global = require( dep_dbPath + '/global.js')

module.exports = {
  init: () => {
    return global.init()
    // return dep_global.init()
  },
  getEvent: event.get, // @Param (board_id, element_id) -> user
  updateEvent: event.update, // @Param (event_id, event)
  deleteEvent: event.delete, //@Param (event_id)
  addEvent: event.insert,  //@Param (event)

  // Compatibility
  dep_getEvent: dep_event.get
}



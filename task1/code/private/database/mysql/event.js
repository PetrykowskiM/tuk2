'use strict'
const global = require(__dirname + '/global.js')
const q = require('q')

module.exports = {
  get: getBoardEvents,
  before: getAllBefore,
  update: updateEvent,
  delete: deleteEvent,
  insert: insertEvent,
}

function getBoardEvents(boardId, elementId) {
  const deferred = q.defer()
  let query = `SELECT * FROM ${global.tables.event}  WHERE board_id=?`
  if(elementId)
    query += ` and element_id=${elementId}`

  global.instance.query(query, [boardId, elementId], function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else if (result) {
      deferred.resolve(result)
    }
  })

  return deferred.promise
}

function getAllBefore() {
  const deferred = q.defer()
  let query = `SELECT * FROM ${global.tables.event}  WHERE board_id=?`
  if(elementId)
    query += ` and element_id=${elementId}`

  global.instance.query(query, [boardId, elementId], function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else if (result) {
      deferred.resolve(result)
    }
  })

  return deferred.promise
}

function updateEvent(id, event) {
  const deferred = q.defer()

  global.instance.query('UPDATE ' + global.tables.event + ' SET ? WHERE id=?', [user, event], function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else {
      deferred.resolve()
    }
  })

  return deferred.promise
}

function deleteEvent(id) {
  const deferred = q.defer()

  global.instance.query('Delete from ' + global.tables.event + ' Where id=?', [id], function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else {
      deferred.resolve()
    }
  })

  return deferred.promise
}

function insertEvent(event) {
  const deferred = q.defer()
  event['created_at'] = Date.now()
  global.instance.query('INSERT INTO ' + global.tables.event + ' SET ?', event, function (err, result) {
    if (err) {
      console.error(err)
      deferred.reject(err)
    } else {

      deferred.resolve()
    }
  })

  return deferred.promise
}

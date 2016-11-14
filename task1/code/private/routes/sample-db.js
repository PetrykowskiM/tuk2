'use strict';
/**
 * /sample/db
 *
 * Sample Route that serves the result from a database route as json
 *
 */
const db = require("../database/dbinterface.js")

module.exports = (app) => {
    app.get('/sample/db', (req, res) => {
      let numberOfEntries = req.query.number

        db.getTopEntries(numberOfEntries)
          .then( result => {
            res.json({
              result
            })
          })
          .catch( () => {res.stats(500).send() })
    })
}
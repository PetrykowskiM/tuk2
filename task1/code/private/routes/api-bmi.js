'use strict';

const db = require("../database/dbinterface.js")

module.exports = (app) => {
    app.get('/api/bmi/highest', (req, res) => {
      let numberOfEntries = req.query.limit;

        db.getBmi("DESC", numberOfEntries)
          .then( result => {
            res.json({
              result
            })
          })
          .catch( () => {res.stats(500).send() });
    });

    app.get('/api/bmi/lowest', (req, res) => {
      let numberOfEntries = req.query.limit;

      db.getBmi("ASC", numberOfEntries)
        .then( result => {
          res.json({
            result
          })
        })
        .catch( () => {res.stats(500).send() });
    });
}

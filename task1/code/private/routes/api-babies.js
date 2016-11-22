'use strict';

const db = require("../database/dbinterface.js")

module.exports = (app) => {
    app.get('/api/babies/largest', (req, res) => {
      let numberOfEntries = req.query.limit;

        db.getBabies("DESC", numberOfEntries)
          .then( result => {
            res.json({
              result
            })
          })
          .catch( () => {res.stats(500).send() });
    });

    app.get('/api/babies/smallest', (req, res) => {
      let numberOfEntries = req.query.limit;

      db.getBabies("ASC", numberOfEntries)
        .then( result => {
          res.json({
            result
          })
        })
        .catch( () => {res.stats(500).send() });
    });
}

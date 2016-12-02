'use strict';

const db = require("../database/dbinterface.js")

module.exports = (app) => {

    app.get('/api/bmi', (req, res) => {
      let numberOfEntries = req.query.limit;

      db.getBmi()
        .then( result => {
          res.json({
            result
          })
        })
        .catch( () => {res.stats(500).send() });
    });
}

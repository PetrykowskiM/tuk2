'use strict';

const db = require("../database/dbinterface.js")

module.exports = (app) => {

    app.get('/api/bmi', (req, res) => {
      let numberOfEntries = req.query.limit;

      db.getBmi()
        .then( result => {
          result = result.map( (e) => (Object.assign({UNIT: 'kg/m^2'}, e)) )
          res.json({
            result
          })
        })
        .catch( () => {res.stats(500).send() });
    });
}

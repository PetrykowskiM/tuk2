'use strict';

const db = require("../database/dbinterface.js")

module.exports = (app) => {
    app.get('/api/top', (req, res) => {
      let numberOfEntries = req.query.limit;

        db.getTopEntries(numberOfEntries)
          .then( result => {
            res.json({
              result
            })
          })
          .catch( () => {res.stats(500).send() });
    });

    app.get('/api/oldest', (req, res) => {
      let numberOfEntries = req.query.limit;
        db.getOldest()
          .then( result => {
            result = result.map( (e) => (Object.assign({UNIT: 'age in days'}, e)) )
            res.json({
              result
            })
          })
          .catch( () => {res.stats(500).send() });
    });
    app.get('/api/pyramid', (req, res) => {
        db.getPyramid()
          .then( result => {
            res.json({
              result
            })
          })
          .catch( () => {res.stats(500).send() });
    });

    app.get('/api/density', (req, res) => {
        db.getDensity()
          .then( result => {
            result = result.map( (e) => (Object.assign({UNIT: '2^x people per sq-km'}, e)) )
            res.json({
              result
            })
          })
          .catch( () => {res.stats(500).send() });
    });
}

'use strict';

const db = require("../database/dbinterface.js")

function checkBday(bday){
  const regex = /(1|2)\d\d\d-(0\d|1[0-2])-([0-2]\d|3[0-1])/g
  return regex.exec(bday)
}

module.exports = (app) => {


    app.get('/api/diverse/:year', (req, res) => {
        db.getMostDiverseOrSimiliar(req.params.year)
          result = result.map( (e) => (Object.assign({UNIT: 'diversity count'}, e)) )
          .then( result => {
            res.json({
              result
            })
          })
          .catch( () => {res.stats(500).send() });
    });
}

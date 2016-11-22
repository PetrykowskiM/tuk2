'use strict';

const db = require("../database/dbinterface.js")

function checkBday(bday){
  const regex = /(1|2)\d\d\d-(0\d|1[0-2])-([0-2]\d|3[0-1])/g
  return regex.exec(bday)
}

module.exports = (app) => {
    app.get('/api/most/:bday/similiar', (req, res) => {
      let numberOfEntries = req.query.limit;
      let weight = req.query.weight;
      let height = req.query.height;
      let bday = req.params.bday;
      if(!weight || !height || !bday){
        res.json({
          "error": "You must provide weight, height and bday"
        });
        return;
      }
      if(!checkBday(bday)){
        res.json({
          "error": bday + " is not a valid birthday."
        });
        return;
      }


        db.getMostDiverseOrSimiliar(bday, height, weight, "ASC", numberOfEntries)
          .then( result => {
            res.json({
              result
            })
          })
          .catch( () => {res.stats(500).send() });
    });

    app.get('/api/most/:bday/diverse', (req, res) => {
      let numberOfEntries = req.query.limit;
      let weight = req.query.weight;
      let height = req.query.height;
      let bday = req.params.bday;
      if(!weight || !height || !bday){
        res.json({
          "error": "You must provide weight, height and bday"
        });
        return;
      }
      if(!checkBday(bday)){
        res.json({
          "error": bday + " is not a valid birthday."
        });
        return;
      }


        db.getMostDiverseOrSimiliar(bday, height, weight, "DESC", numberOfEntries)
          .then( result => {
            res.json({
              result
            })
          })
          .catch( () => {res.stats(500).send() });
    });
}

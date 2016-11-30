'use strict'
const global = require(__dirname + '/global.js')
const config = require(__dirname + '/../../config.json')
const q = require('q')

module.exports = {
  topEntries: getTopEntries,
  babies: getBabies,
  bmi: getBmi,
  diverseOrSimiliar: getMostDiverseOrSimiliar,
  oldest: getOldest,
  pyramid: getPyramid
}
function execute(query){
  const deferred = q.defer();
  global.query(query)
    .then(result => {
      deferred.resolve(result)
    })
    .catch( deferred.reject )
  return deferred.promise
}

function limitedQuery(query, limit){
  if(!limit){
    limit = config.default.limit;
  }
  query += ` LIMIT ${limit}`;
  return execute(query);
}


function getTopEntries(limit) {
  let query = `select * from ${global.tables.persons}`
  return limitedQuery(query, limit);
}

function getBabies(sorting, limit){
  let year = new Date().getFullYear() - config.definition.baby;
  let query = `select * from ${global.tables.persons} WHERE YEAR(birth_date) >= ${year} ORDER BY height ${sorting}`
  return limitedQuery(query, limit);
}

function getBmi(sorting, limit){
  console.log(sorting, limit)
  let query = `select *, weight/((height/100)*(height/100)) As BMI from ${global.tables.persons}` +
              ` ORDER BY weight/((height/100)*(height/100)) ${sorting}`
  return limitedQuery(query, limit);
}

function getMostDiverseOrSimiliar(bday, height, weight, sorting, limit){
  let query = `select * from ${global.tables.persons}` +
              ` WHERE birth_date = TO_DATE('${bday}', 'YYYY-MM-DD')` +
              ` ORDER BY ABS(weight-${weight}) ${sorting}, ABS(height-${height}) ${sorting}`;
  return limitedQuery(query, limit);
}

function getOldest(limit){
  let query = `SELECT * FROM ${global.tables.persons} ORDER BY YEAR(NOW())-YEAR(birth_date) DESC`;
  return limitedQuery(limit);
}
function getPyramid(){
  let query = `SELECT YEAR(NOW())-YEAR(birth_date) As AGE,
             COUNT(case when gender = 'm' then 1 else null end) As m,
             COUNT(case when gender = 'f' then 1 else null end) AS f
            FROM ${global.tables.persons}
            GROUP BY YEAR(birth_date)
            ORDER BY YEAR(birth_date) ASC`
  return execute(query);
}

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
  pyramid: getPyramid,
  density: getDensity
}

const zipDivider = 100

function execute(query){
  const deferred = q.defer();
  global.query(query)
    .then(result => {
      deferred.resolve(result)
    }, console.log)
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

function getBabies(){
  console.log("getBabies");
  let year = new Date().getFullYear() - config.definition.baby;
  let query = `select TO_INTEGER(zip/${zipDivider}) AS zip, AVG(height) AS value from ${global.tables.persons} WHERE YEAR(birth_date) >= ${year} GROUP BY TO_INTEGER(zip/${zipDivider})`
  console.log(query);
  return execute(query);
}

function getBmi(){
  let query = `select TO_INTEGER(zip/${zipDivider}) AS zip, AVG(weight/((height/100)*(height/100))) AS value from ${global.tables.persons}` +
              ` GROUP BY TO_INTEGER(zip/${zipDivider})`
  return execute(query);
}

function getDensity(){
  let query = `select TO_INTEGER(p.zip/${zipDivider}) AS zip, COUNT(*)/z.size AS value from ${global.tables.persons} AS p` +
              ` JOIN tukgrp3.zipsize AS z ON TO_INTEGER(p.zip/${zipDivider}) = z.zip ` +
              ` GROUP BY TO_INTEGER(p.zip/${zipDivider}), z.size`
  return execute(query);
}

function getMostDiverseOrSimiliar(year){
  let query = `select ROUND(height) As height, ROUND(weight) As weight, COUNT(*) As count from ${global.tables.persons}` +
              ` WHERE YEAR(birth_date) = ${year}` +
              ` GROUP BY ROUND(height), ROUND(weight)`;
  return execute(query);
}

function getOldest(){
  let query = `SELECT TO_INTEGER(zip/${zipDivider}) AS zip, MAX(DAYS_BETWEEN (birth_date, CURRENT_DATE)) As value FROM ${global.tables.persons} GROUP BY TO_INTEGER(zip/${zipDivider})`;
  return execute(query);
}
function getPyramid(){
  let query = `SELECT YEAR(NOW())-YEAR(birth_date) As AGE,
             COUNT(case when gender = 'm' then 1 else null end) As m,
             COUNT(case when gender = 'f' then 1 else null end) AS f,
             COUNT(case when gender = 'm' then 1 else null end) - COUNT(case when gender = 'f' then 1 else null end) As diff
            FROM ${global.tables.persons}
            GROUP BY YEAR(birth_date)
            ORDER BY YEAR(birth_date) ASC`
  return execute(query);
}

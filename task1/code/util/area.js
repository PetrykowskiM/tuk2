var geojsonArea = require('geojson-area');
var obj = require('./plz2.json')

for(i in obj.features){
  var feature = obj.features[i]
  var area = parseInt(geojsonArea.geometry(feature.geometry)/1000000);
  console.log("INSERT INTO tukgrp3.zipsize (zip,size) VALUES  ('"+feature.properties.plz+"', '"+area+"')")
}

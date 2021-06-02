let mongoose = require('mongoose');

let citySchema = mongoose.Schema({
  name: String,
  lat: String,
  lng: String,
  url: String,
  description: String,
  tempMin: String,
  tempMax: String,
});

let cityModel = mongoose.model('cities', citySchema);

module.exports = cityModel;

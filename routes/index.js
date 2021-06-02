let express = require('express');
let router = express.Router();
let request = require('sync-request');
let CityModel = require('../models/cities');

/* GET home page. */
router.get('/', (req, res) => {
  res.render('login', { title: 'Express', msgErr: '' });
});

/* GET weather page. */
router.get('/weather', async (req, res) => {
  if (req.session.user == null) {
    res.redirect('/');
  } else {
    let cities = await CityModel.find();

    res.render('weather', {
      title: 'Express',
      cityList: cities,
      messageErr: '',
    });
  }
});

/* Post new city */
router.post('/add-city', async (req, res) => {
  let resRequest = request(
    'GET',
    `https://api.openweathermap.org/data/2.5/weather?q=${req.body.cityName}&units=metric&appid=f90ef8753bb7907f442dc81030822094&lang=fr`
  );
  let resultJSON = JSON.parse(resRequest.body);
  console.log(resultJSON);

  // Get error
  let cityName = false;

  // Get API Error
  if (resultJSON.cod === '404') {
    cityName = true;
  }

  var cities = await CityModel.find();
  cities.forEach((city) => {
    if (
      city.name.toLocaleLowerCase() === req.body.cityName.toLocaleLowerCase()
    ) {
      cityName = true;
    }
  });

  if (cityName === false) {
    let newCity = new CityModel({
      name: req.body.cityName,
      lat: resultJSON.coord.lat,
      lng: resultJSON.coord.lon,
      url: `http://openweathermap.org/img/w/${resultJSON.weather[0].icon}.png`,
      description: resultJSON.weather[0].description,
      tempMin: resultJSON.main.temp_min,
      tempMax: resultJSON.main.temp_max,
    });

    let city = await newCity.save();
  }
  cities = await CityModel.find();

  res.render('weather', {
    title: 'Weather App',
    cityList: cities,
    messageErr: resultJSON,
  });
});

/* Delete city */
router.get('/delete-city', async (req, res) => {
  await CityModel.deleteOne({ _id: req.query.id });
  res.redirect('weather');
});

/* Update city */
router.get('/update-data', async (req, res) => {
  var cities = await CityModel.find();
  cities.forEach(async (city) => {
    let resRequest = request(
      'GET',
      `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&units=metric&appid=f90ef8753bb7907f442dc81030822094&lang=fr`
    );
    let resultJSON = JSON.parse(resRequest.body);
    await CityModel.updateOne(
      { _id: city._id },
      {
        url: `http://openweathermap.org/img/w/${resultJSON.weather[0].icon}.png`,
        description: resultJSON.weather[0].description,
        tempMin: resultJSON.main.temp_min,
        tempMax: resultJSON.main.temp_max,
      }
    );
  });

  res.redirect('weather');
});

module.exports = router;

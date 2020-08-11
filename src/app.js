require('dotenv').config();
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./geocode');
const forecast = require('./forecast');


const app = express();
const port = process.env.PORT || 3000

// Express config paths
const pubDir = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

// Handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use(express.static(pubDir));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Bobo Bagbag'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Bobo Bagbag'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Halp',
    name: 'Bobo Bagbag'
  })
})

app.get('/weather', (req, res) => {
  if (req.query.address != undefined) {
    geoCode(req.query.address, (error, { lat, lon, loc } = {}) => {
      if (error) {
        return res.send({ error })
      }
      forecast(lat, lon, (error, forecastData) => {
        if (error) {
          return res.send({ error })
        }
        res.send({forecast: forecastData, lat:lat, lon:lon, loc:loc})
      })
    })
  } else {
    res.send({
      error: 'no query'
    })
  }
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    message: 'Help article not found',
    name: 'Bobo Bagbag'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    message: 'Page Not Found',
    name: 'Bobo Bagbag'
  })
})

app.listen(port, () => {
  console.log(`hacking the mainframe at port ${port}`);
})

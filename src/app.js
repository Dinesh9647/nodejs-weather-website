const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup public directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dinesh Kundu'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Dinesh Kundu'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Dinesh Kundu'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Address must be provided'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error});
        }
        forecast(latitude, longitude, (error, weatherData) => {
            if(error) {
                return res.send({error});
            }
            return res.send({
                forecast: weatherData,
                location,
                address: req.query.address
            });
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dinseh Kundu',
        errorMessage: 'Help article not found.'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Dinesh Kunsu',
        errorMessage: 'Page not found'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
})
const axios = require('axios');

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ce560aec28fa2bddfdc08b0e35a8226d&query=${latitude},${longitude}`;
    axios.get(url)
        .then(({data}) => {
            if(data.error) {
                callback('Unable to find location!');
            }
            else {
                const current = data.current;
                callback(undefined, `${current.weather_descriptions[0]}. It is currently ${current.temperature} degrees out. It feels like ${current.feelslike} degrees out. The humidity is ${current.humidity}%.`);
            }
        })
        .catch(() => {
            callback('Unable to connect to weather service!');
        })
}

module.exports = forecast;
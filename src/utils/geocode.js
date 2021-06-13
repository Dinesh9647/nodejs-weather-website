const axios = require('axios');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGluZXNoODU5NyIsImEiOiJja3BsZWxsc2wwczRmMnVvYXhia3F5MHNtIn0.qs9ld3Q9ngocSGMA0a7hBQ&limit=1`;
    axios.get(url)
        .then(({data}) => {
            if(!data.features.length) {
                callback('Unable to find location. Try another search.');
            }
            else {
                callback(undefined, {
                    latitude: data.features[0].center[1],
                    longitude: data.features[0].center[0],
                    location: data.features[0].place_name
                })
            }
        })
        .catch(() => {
            callback('Unable to connect to location services!');
        })
}

module.exports = geocode;
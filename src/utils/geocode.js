
const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicGt3b2siLCJhIjoiY2t1ODQ4NjF1MDc2MTJ2cGtwcWd0OXc0YSJ9.D_2Q2VH5dCRKF5rkjIWILw&limit=1'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (!body.features) {
            callback('Unable to find location! Try another Search', undefined)          
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
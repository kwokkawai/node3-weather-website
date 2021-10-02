const request = require('request')

const currentweather = (latitude, longitude, callback) => {
    
    const url = 'http://api.weatherstack.com/current?access_key=c1d13b91824f24d599cc77c5ba56c383&query=' + latitude + ',' + longitude + '&units=f'


    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location! Try another Search', undefined)       
        } else {
            callback(undefined, 'Temp: ' + response.body.current.temperature + ' ,Feels Like: ' + response.body.current.feelslike)
        }
    })

}

module.exports = currentweather

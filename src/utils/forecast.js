const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1c9a6bb4ff0fd3a593ccd493631cd69c&query=' +
    latitude + ',' + longitude + '&units=f'

    request({url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error)  {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' +
             body.current.temperature + ' degrees out. It feels like ' +
              body.current.feelslike + ' degrees out.' + ' Humidity: ' +
              body.current.humidity + '%.')
        }
    })
}

module.exports = forecast
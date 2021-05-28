const request = require('request')

const forecast = (latitude, longitude, callback) => {


    const url = 'http://api.weatherstack.com/current?access_key=1c938faa63aa035c736aa39e0f441603&query=' + longitude + ',' + latitude + '&units=f'

    request({ url: url, json: true}, (error, response) => {
        // const data = JSON.parse(response.body)
        // console.log(data.current)
        
        if(error){
            callback ('Unable to connect with weather services!', undefined)
        }else if(response.body.error){
            
            callback ('Unable to find location!', undefined)
        }
        else
        {
        callback(undefined, response.body.current.weather_descriptions[0] + '. current temprature is ' + response.body.current.temperature + ' and feel like temprature is ' + response.body.current.feelslike)
        }
    
    })

}

module.exports = forecast
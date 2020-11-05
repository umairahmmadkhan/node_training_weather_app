const request = require('postman-request')

const forecast = (latitude,langitude, callback) => {
    url = 'http://api.weatherstack.com/current?access_key=05e351d4c2a5b4be5253fd3c2ece1ecb&query='+latitude+','+langitude    
    
    request({url, json:true}, (error,{body} = {}) => {
        if(error)
        {
            callback('Unable to connect to Weather API', undefined)
        }else if(body.error){
            callback('Invalid Location for Weather API', undefined)
        }else{
            const {temperature,feelslike:feels_like} = body.current
            weather ={
                temperature,
                feels_like
            } 
            callback(undefined,weather)
        }
    })
}

module.exports = forecast
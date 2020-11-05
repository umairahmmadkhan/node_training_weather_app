const request = require('postman-request')

const geocode = (location, callback) => {
    geoUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(location) +'.json?access_token=pk.eyJ1IjoidW1haXJhaG1tYWRraGFuIiwiYSI6ImNrZDBka3dzbjBjOHAyenBjbGFxYm5saGMifQ.6ciUF4szrJZYeJ4bD-oGVg&limit=1'
    request({url:geoUrl, json:true}, (error,{body} = {}) => {
        if(error){
            callback('Unable to connect to Geo coding API',undefined)
        }else if (body.features.length === 0){
            callback('Unable to find location',undefined)
        }else{
            const {center:coordinates, place_name:location} = body.features[0]
            coords={
                longitude:coordinates[0],
                latitude:coordinates[1],
                location
            }            
            callback(undefined,coords)
        }    
    })
}

module.exports = geocode
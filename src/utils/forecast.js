const req = require('request')

const forecast = (longtitude, letitude , callback) =>{
    const url = "https://api.darksky.net/forecast/5cb0aca8cf8daa8416744b03fa890f7f/" + longtitude + "," + letitude
        req({ url, json:true },(error , {body})=>{
            if(error)
                callback("Can't connect to server",undefined)
            if(body.error)
                callback("Can't find that location",undefined)
            else
                callback(undefined,body.daily.data[0].summary)
        })
}
module.exports = forecast
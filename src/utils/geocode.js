const req = require('request')

const geocode = (location , callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoibWUtbWFuaXNoLXByYWphcGF0aSIsImEiOiJjanczanU0azAwamk2M3pxcjBpdzg1d3VsIn0.7pUy4ImYP2XEJ8vhKIPQ4w&limit=1'
    req({ url, json:true },(error , {body})=>{
        if(error)
        {
            callback("Please Check Network Connectivity",undefined)
        }else if(body.features[0] == undefined)
        {
            callback("unable to find location",undefined)
        }
        else
        {
            const leti = body.features[0].center[0]
            const lon =  body.features[0].center[1]
            const name =  body.features[0].place_name
            callback(undefined,{leti,lon,name})
        }
    })
}
module.exports = geocode //this is function name
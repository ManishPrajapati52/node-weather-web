const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')
const app = express()

const publicDirectoryPath = path.join(__dirname , '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
const port = process.env.PORT || 3000

//Setup HandleBars For Dynamic COntenet From Views Directory
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

//Setup static Dictionary to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather',
        name: 'Manish'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About',
        name: 'Manish'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Message',
        name:"Manish",
        message: 'Lorem Something'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
        return res.send({
            error: 'you need to provide a address'
        })
    geocode(req.query.address,(error,{ leti:letitude , lon:longtitude , name} = {})=>{
        if(error)
            return res.send({
                error:error
            })
        else
        {
            forecast(letitude, longtitude, (error,ForecastData)=>{
                if(error)
                {
                    res.send({
                        error: error
                    })
                }
                else
                {
                    res.send({
                        address: req.query.address,
                        forecast : ForecastData,
                        location:name
                    })
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        name: 'Manish',
        errorMessage: 'Requested Help Article is not available'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        name: 'Manish',
        errorMessage: 'Requested page is not available'
    })
})

app.listen(port, () => {
    console.log('Server Starts at : ' + port)
})
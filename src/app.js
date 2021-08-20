const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')


const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')   //gets absolute path to directory where index.html is
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))    //provides path to express.static that configures application  

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Great Scott'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Great Scott'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help message!',
        title: 'Help',
        name: 'Aaron'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {  //!req.query.address (if there is no address --> barlow-weather-app.com/weather? ' nothing ')
        return res.send({
            error: 'You must provide an address.'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error }) // object { error: error } moved to shorthand { error }
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error }) // object { error: error } moved to shorthand { error }
            }
            res.send({
                forecast: forecastData,
                location, // 'location: location,' moved to shorthand 'location,'
                address: req.query.address
            })
            
        })
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Aaron'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Aaron'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})
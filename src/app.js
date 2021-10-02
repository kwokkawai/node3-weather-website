// Test: nodemon src/app.js -e js,hbs 

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const currentweather = require('./utils/currentweather')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Paul Kwok'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Paul Kwok'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is my first Web Application.',
        title: 'Help',
        name: 'Paul Kwok'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location }) => {
        if (error) {
            return res.send({ error })
        }

        currentweather(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            // console.log(forecastData)
            // console.log(location)
            // console.log(req.query.address)        
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

    // geocode(address, (error, { latitude, longitude, location }) => {        
    //     if (error) {
    //         return console.log(error)
    //     }
    
    //     currentweather(latitude, longitude, (error, {temperature, feelslike} ) => {
    //         if (error) {
    //             return console.log(error)
    //         }
    //         console.log('Location: ' + location + ', Temp: ' + temperature + ', Temp Feel like: ' + feelslike)
    //     })    
    // })

    // console.log(req.query.address)
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Philadelphia',
    //     address: req.query.address
    // })
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
        name: 'Paul Kwok',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Paul Kwok',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port.' + port)
})


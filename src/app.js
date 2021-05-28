const path = require('path')
const express = require('express')
const hbs = require('hbs')   // for inheritance we need
const geocode = require('./utils/giocode')
const forecast = require('./utils/forecast')


//console.log(__dirname)     // it contains folder path
//console.log(path.join(__dirname, '../public'))    // it contains path of public folder


const app = express()


// define path for express configuration
const publicfolderpath = path.join(__dirname, '../public')
const viewpath = path.join(__dirname, '../templates/views')
const partialpath = path.join(__dirname, '../templates/partials')    // this folder contain hear and footer for inheriting

//setup handlebars engine and vies locations
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialpath)


//setup static directory to serve
app.use(express.static(publicfolderpath))

// app.get('', (req, res) => {            // npw no use of this because we are serving static file

//     res.send('Hello Express')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'weather@app'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Harod'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'aryan'
    })
})


// app.get('/help', (req, res) => {
//     res.send('<h1> Help page </h1>')     // sending back HTML
// })


// app.get('/about', (req, res) => {
//                 // sending back JSON data
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide Address!'
        })
    }

    // res.send([{
    //     forecast: 'its snowing',
    //     location: 'Baloda',
    //     address: req.query.address
    // }])


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }

        // console.log('Error', error)
        // console.log('Data', data )

        forecast(latitude, longitude, (error, forecastdata) => {

            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address
            })

        })


    })
})


app.get('/product', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Omprakash Harod',
        errormsg: 'Help article not found!'
    })
})

// it will work for any path if path is not found above
app.get('*', (req, res) => {

    res.render('404', {
        title: '404',
        name: 'Omprakash Harod',
        errormsg: 'Page Not Found!'
    })

})




app.listen(3000, () => {
    console.log('server is up and running')
})
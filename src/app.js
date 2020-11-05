const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//configure
const app = express()
const publicFolderPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup template engine
app.use(express.static(publicFolderPath))
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup static dir 
app.use(express.static(publicFolderPath))

 app.get('', (req,res)=>{
     res.render("index", {
         title: "Hello world",
         name: "Umair"         
     })
 })

 app.get('/about', (req,res)=>{
     res.render("about", {
         title: "About Page",
         name: "Umair",
         last_name: "Ahmad Khan"
     })
 })

 app.get('/help', (req,res)=>{
     res.render("help", {
         title: "Help Page",
         name: "Umair",
         content: "This is help page"
     })
 })

 
app.get('/weather', (req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: "You must provide a valid address"
        })
    }
    geocode(req.query.address, (err,{latitude,langitude,location} ={}) => {  
        if(err)
        {
            return res.send({
                error: err
            })
        } 
        forecast(latitude, langitude, (err, {temperature,feels_like}) => {
            if(err){
                return res.send({
                    error: err
                })
            }
            res.send({
                temperature,
                feels_like,
                location
            })            
        })
    
    
    })
    
})

app.get('/help/*', (req,res) => {
    res.render("404", {
        title: "Help Article Not Found",
        name: "Umair",
        content: "This Help article is not yet written"
    })
})
app.get('*', (req, res) => {
    res.render("404", {
        title: "Page Not Found",
        name: "Umair",
        content: "Following URL is not valid"
    })
})

app.listen(3000, ()=> {
    console.log('express server is running on port 3000')
})
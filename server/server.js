const express = require('express')
const app = express();
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const morgan = require('morgan')
const {Bill,Chore,House,Message,User} = require("./models");

app.use(morgan('tiny'))

mongoose.connect('mongodb://localhost:27017/roomez',{})

app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

app.use(express.static("public"));

const db = mongoose.connection;

db.on('error',console.error.bind(console,'connection error:'));
db.once('open',() => {
    console.log('Database Connected')
})

app.get('/',(req,res) => {
    res.redirect('/')
})

app.get('/api/houses',async (req,res)=>{
    let data = await House.find({}).populate("occupants")
    res.status(200).json(data)
})

app.get('/api/users',async (req,res)=>{
    let data = await User.find({}).populate('house')
    res.status(200).json(data)
})

// app.get('/campgrounds',catchAsync(async (req,res) => {
//     const campgrounds = await Campground.find({});
//     res.render('campgrounds/index', {campgrounds})
// }))

// app.get('/campgrounds/new',catchAsync(async(req,res)=> {
//     res.render('campgrounds/new')
// }))

// app.post('/campgrounds', catchAsync(async (req, res, next) => {
//     // console.log(req.body)
//     if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400)
//     const campground = new Campground(req.body.campground);
//     console.log(campground)
//     await campground.save();
//     res.redirect(`/campgrounds/${campground._id}`)
// }))

// app.get('/campgrounds/:id',catchAsync(async (req,res) => {
//     const campground = await Campground.findById(req.params.id);
//     res.render('campgrounds/show', {campground})
// }))

// // Render form to edit
// app.get('/campgrounds/:id/edit',catchAsync(async (req,res) => {
//     const campground = await Campground.findById(req.params.id);
//     res.render('campgrounds/edit', {campground})
// }))

// // Edit the campground
// app.put('/campgrounds/:id',catchAsync(async (req,res) => {
//     const campground = await Campground.findByIdAndUpdate(req.params.id,{...req.body.campground});
//     res.redirect(`/campgrounds/${campground._id}`)
// }))

// // delete campground
// app.delete('/campgrounds/:id',catchAsync(async (req,res) => {
//     const campground = await Campground.findByIdAndDelete(req.params.id);
//     console.log('Successfuly deleted')
//     res.redirect(`/campgrounds`)
// }))

// app.get('/makecampground',catchAsync(async (req,res)=>{
//     const camp = new Campground({title:'My Backyard'})
//     await camp.save();
//     res.send(camp)
// }))

app.all('*',(req,res,next)=>{
    next(new ExpressError('Woops, Page Not Found',404))
})

// Error handler
app.use((err,req,res,next)=>{
    const {statusCode = 500,message = 'Something went wrong'} = err
    res.status(statusCode).send(message)
})

app.listen(3000, () => {
    console.log('Now listening on port http://localhost:3000/')
})
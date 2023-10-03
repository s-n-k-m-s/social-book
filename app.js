const express = require('express')
const app = express()
const alert = require('alert')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
//setting a view engine
app.set('view engine', 'ejs')

app.use(express.static('public'))
// mongoose connection
const dbURL = "" // paste your mongodb link
mongoose.connect(dbURL)
.then(()=>{
    console.log('connected to database')
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})

app.get('/', (req, res) => {
  res.redirect('/login')
})
app.get('/login', (req, res) => {
    Blog.find().then((result)=>{
        res.render('login', { title: 'Home page', blogs: result })
    }).catch((err)=>{
        console.log(err)
    })
  })

app.use(express.urlencoded({ extended: true })) //middleware
app.post('/login',(req,res)=>{
    const blog = new Blog(req.body)
    blog.save().then(()=>{
        res.redirect('/login')
    }).catch((err)=>{
        console.log(err)
    })
  })

app.post('/home',async (req,res)=>{
    try{
        const check = await Blog.findOne({email:req.body.email})
        if(check.password == req.body.password){
            alert("Login Successful")
            res.render('index', { title: 'Home page' })
        }
        else{
            alert("Wrong Password")
            res.redirect('/login')
        }
    }
    catch{
        alert("Wrong Details")
        res.redirect('/login')
    }
})
app.get('/signup', (req, res) => {
    res.render('signup', { title: 'Signup page' })
})
app.use((req, res) => {
    res.render('404', { title: '404 page' })
})

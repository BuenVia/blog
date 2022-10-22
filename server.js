const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect('mongodb://localhost/blog_two')

const articlesRouter = require('./routes/articles')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))
app.use('/', articlesRouter)

app.listen(9000, (req, res) => {
    console.log('App is listening on port 9000');
})
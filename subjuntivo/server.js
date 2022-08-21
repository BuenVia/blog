const express = require('express')
const app = express()
const port = 9000
const Pages = require('./routes/pages')
const expressLayout = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.use(expressLayout)
app.use(express.static(`${__dirname}/public`))
app.use('/', Pages)

app.listen(port, (req, res) => {
    console.log(`App is listening on port: ${port}`);
})
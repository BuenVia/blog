const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

let port = 3000

mongoose.connect(process.env.MONGO_DB).then(console.log("Successfully connected to DB")).catch(err => console.error(err))

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

const questionsSchema = new mongoose.Schema({
    lang: String,
    questionsList: Array
})

const caseSchema = new mongoose.Schema({
    primCat: {
        type: String,
        required: true
    },
    secCat: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    riskMatrix: {
        hsInvestigation: String,
        investFreq: String
    },
    questions: {questionsSchema},
})

const Case = mongoose.model("Case", caseSchema)

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.get('/api/cases', async (req, res) => {
    const cases = await Case.find()
    res.send(cases)
})

app.post('/api/cases', async (req, res) => {
    const newCase = new Case({
        primCat: req.body.primCat,
        secCat: req.body.secCat,
        branch: req.body.branch,
        riskMatrix: {
            hsInvestigation: req.body.hsInvestigation,
            investFreq: req.body.investFreq
        },
        questions: {
            lang: "English"
        }
    })
    const result = await newCase.save()
    res.send(result)
})

app.listen(port, () => console.log(`App is running on port: ${port}`))
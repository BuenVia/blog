const express = require('express')
const Article = require('./../models/article')
const router = express.Router()


router.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('index', { articles: articles })
})

router.get('/new', (req, res) => {
    res.render('new')
})

router.get('/:id', async (req, res) => {
    const article = await Article.findById( req.params.id )
    res.render('article', { article: article })
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticle())

function saveArticle() {
    return async (req, res) => {
        let article = req.article
        article.title = req.body.title
        article.desc = req.body.desc
        article.text = req.body.text
        try {
            article = await article.save()
            res.redirect('/?=SUCCESS')
        } catch (e) {
            res.redirect('/=ERROR')
            console.log(e);
        }
    }
}

module.exports = router
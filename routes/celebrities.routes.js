const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

router.get('/', async (req, res) => {
    try {
        const celebrities = await Celebrity.find()
        res.render('celebrities/celebrities', {celebrities})
      } catch (error) {
        console.error(error)
      }
})

router.get('/create', (req, res) => {
      res.render('celebrities/new-celebrity')
})

router.post('/create', async (req, res) => {
  try {
    await Celebrity.create(req.body)
    res.redirect('/celebrities')
  } catch {
    res.redirect('/celebrities/create')
  }
})

module.exports = router



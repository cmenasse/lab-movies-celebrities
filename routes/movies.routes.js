const router = require("express").Router();
const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')


router.get('/', async (req, res, next) => {
  try {
      const movies = await Movie.find()
      res.render('movies/movies', {movies})
    } catch {
      next();
    }
})

router.get('/create', async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find()
    res.render('movies/new-movie', {celebrities})
  } catch {
    next();
  }
})

router.post('/create', async (req, res) => {
  try {
    await Movie.create(req.body)
    res.redirect('/movies')
  } catch {
    res.redirect('/movies/new-movie')
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", {movie});
  } catch {
    next();
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);
    const celebrities = await Celebrity.find();
    res.render("movies/edit-movie", {movie, celebrities});
  } catch {
    next();
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    await Movie.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/movies/${id}`)
  } catch {
    next();
  }
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch {
    next();
  }
});

module.exports = router;
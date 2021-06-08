const { Movie, validate } = require("../models/movie");
const { Genre } = require("../models/genre");
const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    let movies = await Movie.find().sort({name: 1});
    res.send(movies);
});

router.get("/:id", async (req, res) => {
    let movie = await Movie.findById(req.params.id);

    if (movie)
        return res.send(movie);

    res.status(404).send("Umm we couldn't find a movie like that");
})

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let genre = await Genre.findById(req.body.genreId);

    const newMovie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.na
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });

    let response = await newMovie.save();
    res.send(response);
})

router.put("/:id", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: req.body.genre,
        numberInStock: req.body.numberInStock || 0,
        dailyRentalRate: req.body.dailyRentalRate || 0
    }, { new: true });

    if (!movie) {
        return res.status(404)
            .send("Umm we couldn't find a customer like that");
    }

    movie = await movie.save();
    res.send(movie);
})

router.delete("/:id", auth, async (req, res) => {
    let movie = await Movie.findByIdAndRemove(req.params.id);
    if (movie)
        return res.send(movie);

    res.status(404)
        .send("Umm we couldn't find a customer like that");
})

module.exports = router;
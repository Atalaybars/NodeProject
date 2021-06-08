const { Genre, validate } = require("../models/genre");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
    let genres = await Genre.find().sort({name: 1});
    res.send(genres);
});

router.get("/:id", async (req, res) => {
    let genre = await Genre.findById(req.params.id);

    if (genre)
        return res.send(genre);

    res.status(404).send("You sure there's a genre like that?" +
                " Cause I could not find any");
})

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);
    
    const newGenre = new Genre({
        name: req.body.name
    });

    let response = await newGenre.save();
    res.send(response);
})

router.put("/:id", auth, async (req, res) => {
    let genre = await Genre.findById(req.params.id);
    if (!genre) {
        return res.status(404)
            .send("You sure there's a genre like that? " +
                "Cause I could not find any");
    }

    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name;
    genre = await genre.save();
    res.send(genre);
})

router.delete("/:id", [auth, admin], async (req, res) => {
    let genre = await Genre.findById(req.params.id);
    if (!genre) {
        return res.status(404)
            .send("You sure there's a genre like that? " +
                "Cause I could not find any");
    }

    genre = await Genre.findByIdAndRemove(req.params.id);
    res.send(genre);
})

module.exports = router;
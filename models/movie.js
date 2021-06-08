const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("../models/genre");

const Movie = mongoose.model("Movie", new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 51,
        trim: true
    },

    genre: {
        type: genreSchema,
        required: true
    },

    numberInStock: {
        type: Number,
        min: 0,
        max: 1000,
        default: 0
    },

    dailyRentalRate: {
        type: Number,
        min: 0,
        max: 1000,
        default: 0
    }
}));

function validateMovie(movie) {

    const schema = Joi.object({
        title: Joi.string()
            .min(1)
            .max(51)
            .required(),

        genreId: Joi.objectId()
            .required(),

        numberInStock: Joi.number()
            .min(0)
            .max(1000),

        dailyRentalRate: Joi.number()
            .min(0)
            .max(100)
    });

    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;
const Joi = require("joi");
const config = require("config");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 55,
        required: true
    },
    email: {
        type: String,
        minlength: 2,
        maxlength: 55,
        unique: true,
        required: true
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1055,
        required: true
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this.id, isAdmin: this.isAdmin }, config.get("jwtPrivateKey"));
}

const User = mongoose.model("User", userSchema);

function validateUser(user) {

    const schema = Joi.object({
        name: Joi.string()
            .min(1)
            .max(55)
            .required(),

        email: Joi.string()
            .email({ minDomainSegments: 2})
            .required(),

        password: Joi.string()
            .min(5)
            .max(21)
            .required()
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    const { error } = validateAuthCredentials(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email }).exec();
    if (!user)
        return res.status(400).send("invalid email or password");

    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("invalid email or password");

    let token = user.generateAuthToken();
    res.send(token);
})

function validateAuthCredentials(request) {
    const schema = Joi.object({
        email: Joi.string()
            .email({ minDomainSegments: 2})
            .required(),

        password: Joi.string()
            .min(5)
            .max(21)
            .required()
    });

    return schema.validate(request);
}

module.exports = router;
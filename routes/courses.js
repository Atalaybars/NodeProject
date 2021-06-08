const Joi = require("joi");
const express = require("express");
const router = express.Router();

const courses = [
    { id: 0, name: "mathematics"},
    { id: 1, name: "physics"},
    { id: 1, name: "history"},
];

router.get("/", ((req, res) => {
    res.send(courses);
}));

router.get("/:id", (req, res) => {
    let course = courses.find(c => c.id == parseInt(req.params.id));
    
    if (course)
        return res.send(course);

    return res.status(404).send("The course with the given id could not be found BUT Do not worry! Try something different! :D");
});

router.post("/", (req, res) => {
    const { error } = validateCourse(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);
    
    let course = {
        id: 3,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

router.put("/:id", (req, res) => {
    let course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) {
        return res.status(404)
        .send("The course with the given id " + 
        "could not be found BUT Do not worry! " +
        "Try something different! :D");
    }

    const { error } = validateCourse(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

router.delete("/:id", (req, res) => {
    let course = courses.find(c => c.id == parseInt(req.params.id));
    if (!course) {
        return res.status(404)
        .send("The course with the given id " + 
        "could not be found BUT Do not worry! " +
        "Try something different! :D");
    }

    let index = courses.indexOf(course);
    courses.splice(index, 1);
    
    res.send(course);
})

function validateCourse(course) {
    
    const schema = Joi.object({
        name: Joi.string()
        .min(1)
        .max(150)
        .required()
    });

    return schema.validate(course);
}

module.exports = router;
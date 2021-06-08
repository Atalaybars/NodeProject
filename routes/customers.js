const { Customer, validate } = require("../models/customer");
const auth = require("../middlewares/auth");
const express = require("express");
const router = express.Router();

router.use(express.json());

router.get("/", async (req, res) => {
    try {
        let customers = await Customer.find().sort({name: 1});
        res.send(customers);
    }
    catch (e) {
        res.status(400).send(`ops! something went wrong!` +
            ` here is the details, good luck!: ${e}`);
    }
});

router.get("/:id", async (req, res) => {
    try {
        let customer = await Customer.findById(req.params.id);

        if (customer)
            return res.send(customer);

        res.status(404).send("Umm we couldn't find a customer like that");
    }
    catch (e) {
        res.status(400).send(`ops! something went wrong!`+
            `here is the details, good luck!: ${e}`);
    }
})

router.post("/", auth, async (req, res) => {
    const { error } = validate(req.body);

    if (error)
        return res.status(400).send(error.details[0].message);

    const newCustomer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    try {
        let response = await newCustomer.save();
        res.send(response);
    }
    catch (e) {
        res.status(400).send(`Couldn't save the data. ` +
            `Here is the error: ${e}`);
    }
})

router.put("/:id", auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    try {
        let customer = await Customer.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold || false // set the default value to false
        }, { new: true });

        if (!customer) {
            return res.status(404)
                .send("Umm we couldn't find a customer like that");
        }

        customer = await customer.save();
        res.send(customer);
    }
    catch (e) {
        res.status(400).send(`Couldn't update the data. ` +
            `Here is the error: ${e}`);
    }
})

router.delete("/:id", auth, async (req, res) => {
    try {
        let customer = await Customer.findByIdAndRemove(req.params.id);

        if (customer)
            return res.send(customer);

        res.status(404)
            .send("Umm we couldn't find a customer like that");
    }
    catch (e) {
        res.status(400).send("Ops! Something went wrong!" +
            ` please debug me please please please! xD error: ${e}`);
    }
})

module.exports = router;
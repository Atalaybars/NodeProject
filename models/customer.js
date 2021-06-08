const Joi = require("joi");
const mongoose = require("mongoose");

const Customer = mongoose.model("Customer", new mongoose.Schema({
        name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 51,
        trim: true
        },

        phone: {
        type: String,
        required: true
        },

        isGold: {
        type: Boolean,
        default: false
        }
}));

function validateCustomer(customer) {

    const schema = Joi.object({
        name: Joi.string()
            .min(1)
            .max(51)
            .required(),

        phone: Joi.string()
            .required(),

        isGold: Joi.boolean()
    });

    return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
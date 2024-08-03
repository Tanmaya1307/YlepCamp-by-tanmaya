const Basejoi = require("joi");
const sanitizeHTML = require("sanitize-html");

const extension = (joi) => ({
    type: "string",
    base: joi.string(),
    messages: {
        'string.escapeHTML': "{{#label}} must not inculde HTML"
    },
    rules: {
        escapeHTML: {
            validate(value, helpers) {
                const clean = sanitizeHTML(value, {
                    allowedTages: [],
                    allowedAttributes: {}
                });
                if (clean !== value) return helpers.error("string.escapeHTML", { value })
                return clean;
            }
        }
    }
})

const joi = Basejoi.extend(extension);
module.exports.campgroundSchema = joi.object({
    campground: joi.object({
        title: joi.string().required().escapeHTML(),
        location: joi.string().required().escapeHTML(),
        description: joi.string().required(),
        price: joi.number().min(0).required(),
        // image: joi.string().required(),
    }).required(),
    deleteImage: joi.array()
})

module.exports.reviewSchema = joi.object({
    review: joi.object({
        body: joi.string().required().escapeHTML(),
        rating: joi.number().required()
    }).required()
})
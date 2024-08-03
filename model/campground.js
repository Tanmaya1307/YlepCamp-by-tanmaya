const mongoose = require("mongoose");
const reviewSchema = require("./review");

const Schema = mongoose.Schema;
const imageSchema = new Schema({
    url: String,
    filename: String,
})

imageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_200")
})

const opts = { toJSON: { virtuals: true } }

const campgroundSchema = new Schema({
    title: String,
    location: String,
    description: String,
    price: Number,
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    images: [imageSchema],
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
},opts);

campgroundSchema.virtual("properties.popUpMarkup").get(function () {
    return `
    <a href="campgrounds/${this.id}">${this.title}</a>
    <p>${this.description.substring(0.15)}...</p>`
})


campgroundSchema.post("findOneAndDelete", async (docs) => {
    if (docs) {
        await reviewSchema.deleteMany({
            _id: {
                $in: docs.reviews
            }
        })
    }
})
module.exports = mongoose.model("Campground", campgroundSchema);
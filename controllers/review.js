const campgroundModel = require("../model/campground");
const ReviewModel = require("../model/review");

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const { review } = req.body;
    const campground = await campgroundModel.findById(id);
    if (!campground) {
        throw new expressError("Campground not found", 404);
    }
    const Review = new ReviewModel(review);
    campground.reviews.push(Review);
    Review.author = req.user._id;
    await campground.save()
    await Review.save();
    req.flash("success","Review Created!")
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await campgroundModel.findByIdAndUpdate(id, { $pull: { reviews:  reviewId } });
    await ReviewModel.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!")
    res.redirect(`/campgrounds/${id}`)
}
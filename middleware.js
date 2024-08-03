const {campgroundSchema, reviewSchema} = require("./joiSchema");
const expressError = require("./utils/ExpressError");
const campgroundModel = require("./model/campground");
const reviewModel = require("./model/review");

module.exports.storeReturnTo = (req, res, next) => {
    if(req.session.returnTo){
        res.locals.returnTo = req.session.returnTo;
    }
    next()
}

module.exports.isLoggedIn = (req,res,next) => {
    if (!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        req.flash("error","You Should Logged In First!")
        return res.redirect("/login");
    }
    next()
}   


module.exports.validateCampground = (req, res, next) => {
    const { error } = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new expressError(msg, 400)
    } else {
        next()
    }
}

module.exports.isAuthor = async (req,res,next)=>{
    const {id} = req.params;
    const campground = await campgroundModel.findById(id);
    if (!campground.author.equals(req.user._id)) {
        req.flash("error","You don't have permission to do that!");
        return res.redirect("/campgrounds");
    }
    next()
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        throw new expressError(msg, 400)
    } else {
        next()
    }
}

module.exports.isReviewAuthor = async (req,res,next)=>{
    const {id, reviewId} = req.params;
    const review = await reviewModel.findById(reviewId);
    if (!review.author._id.equals(req.user._id)) {
        req.flash("error","You don't have permission to do that!");
        return res.redirect("/campgrounds");
    }
    next()
}
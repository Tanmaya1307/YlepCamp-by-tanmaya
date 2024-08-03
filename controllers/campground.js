const campgroundModel = require("../model/campground");
const maptilerClient = require("@maptiler/client");
const { cloudinary } = require("../cloudinary");

maptilerClient.config.apiKey = process.env.MAPTILER_API_KEY;

module.exports.index = async (req, res) => {
    const campgrounds = await campgroundModel.find({})
    if (!campgrounds) {
        req.flash("error", "No Campgrounds")
    }
    res.render("campground/index", { campgrounds });
}

module.exports.createCampgroundForm = (req, res) => {
    res.render("campground/new")
}

module.exports.createCampground = async (req, res, next) => {
    const data = req.body.campground;
    const geoData = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    const campground = new campgroundModel(data);
    campground.geometry = geoData.features[0].geometry;
    campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.author = req.user._id;
    await campground.save();
    req.flash("success", "Campground Created!");
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.showCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await campgroundModel.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author"
        }
    }).populate("author");
    if (!campground) {
        req.flash("error", "Cannot find the campground");
        return res.redirect("/campgrounds")
    }
    res.render("campground/show", { campground })
}

module.exports.editCampgroundForm = async (req, res) => {
    const { id } = req.params;
    const campground = await campgroundModel.findById(id);
    if (!campground) {
        req.flash("error", "Cannot find the campground");
        return res.redirect("/campgrounds")
    }
    res.render("campground/edit", { campground });
}
module.exports.editCampground = async (req, res) => {
    const { id } = req.params;
    const data = req.body.campground;
    const campground = await campgroundModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    campground.images.push(...imgs);
    const geodata = await maptilerClient.geocoding.forward(req.body.campground.location, { limit: 1 });
    campground.geometry = geodata.features[0].geometry;
    await campground.save();
    if (req.body.deleteImage) {
        for (let filename of req.body.deleteImage) {
            cloudinary.uploader.destroy(filename)
        }
        await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImage } } } });
        console.log(campground)
    }
    req.flash("success", "Campground Updated!");
    res.redirect(`/campgrounds/${campground._id}`)
}

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    const deleteCampground = await campgroundModel.findByIdAndDelete(id);
    req.flash("success", "Campground Deleted!");
    res.redirect("/campgrounds")
}
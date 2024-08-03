const express = require("express");
const campgroundModel = require("../model/campground");
const campground = require("../controllers/campground");
const catchAsync = require("../utils/CatchAsync");
const { isLoggedIn, validateCampground, isAuthor } = require("../middleware");  
const router = express.Router();
const multer = require("multer");
const {storage} = require("../cloudinary")
const upload = multer({storage});

router.route('/')
    .get(catchAsync(campground.index))
    .post(isLoggedIn, upload.array("image"),validateCampground, catchAsync(campground.createCampground))
    
router.get("/new", isLoggedIn, campground.createCampgroundForm)

router.route("/:id")
    .get(catchAsync(campground.showCampground))
    .put(isLoggedIn, isAuthor,upload.array("image"),validateCampground, catchAsync(campground.editCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campground.deleteCampground))


router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campground.editCampgroundForm));



module.exports = router;

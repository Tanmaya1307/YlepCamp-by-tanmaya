const express = require("express");
const userModel = require("../model/user");
const catchAsync = require("../utils/CatchAsync");
const passport = require("passport");
const { storeReturnTo } = require("../middleware");
const router = express.Router({ mergeParams: true });
const user = require("../controllers/user")

router.get("/register",user.registerForm)

router.post("/register", catchAsync(user.userRegisterd));

router.get("/login",user.loginForm)

router.post("/login",storeReturnTo,passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), user.userLoggedIn)

router.get("/logout",user.logoutUser)
module.exports = router;
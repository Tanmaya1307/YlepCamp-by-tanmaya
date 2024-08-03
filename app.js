if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
}   
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const CampgroundRoute = require("./routes/campground");
const ReviewSchema = require("./routes/review");
const session = require("express-session");
const flash = require("connect-flash");
const expressError = require("./utils/ExpressError");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const userModel = require("./model/user");
const userRoute = require("./routes/users");
const mongoSanitize = require("express-mongo-sanitize");
const MongoStore = require("connect-mongo");
const helmet = require("helmet");
const app = express();

const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27  017/new-Yelp-Camp";

const connectDB = async() =>{
    await mongoose.connect(dbUrl)
}   
connectDB()

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'mysecret!'
    }
});

store.on("error",(e)=>{
    console.log(e)
})

const sessionConfig = {
    store:store,
    name:"session",
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        // secure:true,
        expires:Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: + 1000 * 60 * 60 * 24 * 7,
    }
};

app.engine("ejs", ejsMate)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionConfig));
app.use(mongoSanitize());
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(helmet({contentSecurityPolicy:false}))
passport.use(new LocalStrategy(userModel.authenticate()));

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());


app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error")
    next()
})


app.use("/campgrounds", CampgroundRoute)
app.use("/campgrounds/:id/reviews", ReviewSchema);
app.use("/",userRoute);

app.get("/", (req, res) => {
    res.render("home")
});

app.all("*", (req, res, next) => {
    next(new expressError("Page Not Found!", 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong!"
    res.status(statusCode).render("error", { err, statusCode })
})

app.listen(3000, () => {
    console.log("Server Started!")
})
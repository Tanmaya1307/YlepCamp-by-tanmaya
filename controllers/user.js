const userModel = require("../model/user");
module.exports.registerForm =  (req, res) => {
    res.render("users/register");
}
module.exports.userRegisterd = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new userModel({ email, username });
        const newUser = await userModel.register(user, password);
        if (newUser) {
            req.logIn(newUser, (e) => {
                if (e) {
                    req.flash("error", e.message);
                    return res.redirect("/register");
                }
                req.flash("success", "Register Successfully");
                res.redirect("/campgrounds")
            })
        }
    } catch (error) {
        req.flash("error", error.message)
        return res.redirect("/register")
    }
} 

module.exports.loginForm =  (req, res) => {
    res.render("users/login");
}

module.exports.userLoggedIn = (req, res) => {
    req.flash("success", "Logged In Successfully!");
    const redirectUrl = res.locals.returnTo || "/campgrounds";
    res.redirect(redirectUrl)
}

module.exports.logoutUser =  (req, res) => {
    req.logOut((e) => {
        if (e) {
            return req.flash("error", e.message);
        }
        req.flash("success", "Logged Out Successfully!");
        res.redirect("/campgrounds")
    })
}


const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const passport = require("passport");
const passportlocalMongoose = require("passport-local-mongoose");

router.post("/sign-in", passport.authenticate("local", {
    successRedirect: "/index",
    failureRedirect: "/signin"
}), function (req, res) {

});
router.get("/", function (req, res) {
    res.render("sign-in");
});
//***************************************************************************************************/
//AUTH Routes
//show signup form
router.get("/register", function (req, res) {
    res.render("register");

});
router.get("/logout", function (req, res) {
    if (req.isAuthenticated()) {
        req.logout();
        req.session.destroy(function (err) {
            if (err) {
                logger.errorLog.error(err);
            } else {
                res.redirect("/login");
            }
        });
    } else {
        req.flash('error', 'Your were not logged in');
        res.redirect("/login");
    }
});

router.post("/contact", (req, res) => {
    var myData = new Feedback(req.body);
    myData.save()
        .then(item => {
            req.flash("Success", "Your response has been sent successfully");
            res.redirect("/contact");
        })
        .catch(err => {
            req.flash("error", "Something is not right");
        });
});
//handling user signup using POST
router.post("/register", function (req, res) {
    req.body.username
    req.body.password

    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            req.flash("error", "Something is not right!");
            return res.render("register");
        }
        console.log(user)
        passport.authenticate("local")(req, res, function () {
            req.flash("success", "Successfully registered");
            res.redirect("/sign-in");
        });
    });
});

//render the sign-in page
router.get("/sign-in", function (req, res) {
    res.render("sign-in");
});
module.exports = router;
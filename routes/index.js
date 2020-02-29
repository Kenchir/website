const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const passport = require("passport");
const passportlocalMongoose = require("passport-local-mongoose");
const ThingSpeak = require('../Models/thingSpeak');

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/sign-in");

};


router.get("/index", isLoggedIn, function (req, res) {

    ThingSpeak.find({})
        .then(data => {
            console.log(data.length)
            res.render("index", { data: data })

        })
    res.render("index");
});


module.exports = router;
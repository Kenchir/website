const express = require("express");
const app = express();

const delay = require("express-delay");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const localStrategy = require("passport-local");
const passportlocalMongoose = require("passport-local-mongoose");
const request = require("request");
const requestify = require("requestify");
const server = require("http").createServer(app);
//Admin login
const User = require("./Models/user");
//contact
const Feedback = require("./Models/feedback");
//weather values 
const Weather = require("./Models/weather");
//Thingspeak values 
const ThingSpeak = require('./Models/thingSpeak');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://admin:123@cluster0-gksqt.mongodb.net/thingSpeak?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });

mongoose.promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true }
);
useMongoClient: true;



//Passport configuration
app.use(require("express-session")({
    //pass three options 
    secret: "John Cena is new",
    //use to encode and decode sessions
    resave: false,
    saveUninitialized: false
}));

//initialize the use of passport package
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
//set view engine for the application
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(flash());
app.use(delay(200));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//takes data in session and encode and decode it within the session
//************************************* */

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
//ROUTES//
const AuthRoutes = require("./routes/auth")
const indexRoutes = require("./routes/index")
app.use(AuthRoutes)
app.use(indexRoutes)

//handle the sign-in page using POST
//middleware 
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First");
    res.redirect("/sign-in");

};
//*******************************************************************************/

//render the index page 


//render the devices page
app.get("/devices", isLoggedIn, function (req, res) {
    res.render("devices");
});

//render the visualization page
app.get("/visualization", isLoggedIn, function (req, res) {
    res.render("visualization");
});

//render the contact page
app.get("/contact", isLoggedIn, function (req, res) {
    res.render("contact");
});

function getWeather() {
    request("https://api.openweathermap.org/data/2.5/weather?id=184745&APPID=61f7b45beb602670ad05b8e6190fca44", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var parsedData = JSON.parse(body);
            console.log(parsedData["main"]);
            var weatherData = new Weather(parsedData["main"]);
            weatherData.save()
                .then(item => {
                    console.log("Data saved successfully");
                })
                .catch(err => {
                    console.log("an error occured");
                });
        } else {
            console.log(error);
        }
    })
};

setInterval(getWeather, 600000);

function getThingsPeak() {
    request(" https://api.thingspeak.com/channels/973148/feeds.json?api_key=RD4AGYP7DUVPK5WQ&results=1", function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var thingSpeakData = JSON.parse(body);
            let data = thingSpeakData.feeds
            data.forEach(async (each) => {
                console.log(each)
                var thingsData = await new ThingSpeak(each);
                thingsData.save()
                    .then(item => {
                        console.log("Data saved successfully");
                    })
                    .catch(err => {
                        console.log("an error occured");
                    });

            })

        } else {
            console.log(error);
        }
    })
};
//getThingsPeak()
//setInterval(getThingsPeak,60000);

//Start Server 
server.listen(8080, function () {
    console.log("App is up on port 8080 and running");
});
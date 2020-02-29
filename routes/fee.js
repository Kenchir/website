var express = require("express");
var app = express();
var delay = require("express-delay");
var mongoose = require("mongoose");
var passport = require("passport");
var flash = require("connect-flash");
var bodyParser = require("body-parser");
var assert = require('assert');
var fs = require('fs');
var querystring = require('querystring');
var url = require('url');
var http = require('http');
var https = require('https');
var Pusher = require('pusher');
var pusher = new Pusher({
    appId:"949343",
    key:"9dabc9336da537a7a878",
    secret:"5bc8835ca35322185b17",
    cluster:"us3",
    encrypted:true

});
var httpServer = http.createServer(app,function (req, res) {
    pathName = url.parse(req.url).pathname;
    fs.readFile(__dirname +pathName, function(err,data){
        if(err){
            res.writeHead(404, {'Content-Type':'text/plain'});
            res.write('Page was not found');
            res.end();
        }else{
            res.writeHead(200);
            res.write(data);
            res.end();
        }
    });
  });
//var httpsServer = https.createServer(app);


var localStrategy = require("passport-local");
var passportlocalMongoose = require("passport-local-mongoose");
var request = require("request");
var requestify = require ("requestify");
//Admin login
var User = require("./views/user");
//contact
var Feedback = require("./views/feedback");
//weather values 
var Weather = require("./views/weather");
//Thingspeak values 
var ThingSpeak = require('./views/thingSpeak');
mongoose.connect("mongodb://localhost/user_login", { useNewUrlParser: true ,useUnifiedTopology:true });


//Passport configuration
app.use(require("express-session")({
    //pass three options 
    secret:"John Cena is new",
    //use to encode and decode sessions
    resave:false,
    saveUninitialized:false
}));

//initialize the use of passport package
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));
//set view engine for the application
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
// parse application/json
app.use(bodyParser.json());
app.use(flash()); 
app.use(delay(200));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//takes data in session and encode and decode it within the session
//************************************* */

app.use(function(req,res,next){
    res.locals.currentUser =req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});
//ROUTES//

//render the root page
app.get("/",function(req,res){
    res.render("sign-in");
});
//***************************************************************************************************/
//AUTH Routes
//show signup form
app.get("/register",function(req,res){
    res.render("register");

});

//handling user signup using POST
app.post("/register",function(req,res){
    req.body.username
    req.body.password
    //creates a new user object and save the username 
    //pass the password and hash it .
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            req.flash("error","Something is not right!");
            return res.render("register");
        }
        passport.authenticate("local")(req,res, function(){
            req.flash("success","Successfully registered");
            res.redirect("/sign-in");           
        });
    });
});
//render the sign-in page
app.get("/sign-in",function(req,res){
    res.render("sign-in");
});

//handle the sign-in page using POST
//middleware 
app.post("/sign-in",passport.authenticate("local",{
    successRedirect: "/index",
    failureRedirect: "/signin"
}),function(req,res){
    req.flash("success","Signed in Successfully");

});

app.get("/logout",function(req,res){
    req.logout();
     
    req.flash("success","Successfully logged out"); 
    res.redirect("/sign-in");  

});

app.post("/contact", (req, res) => {
    var myData = new Feedback(req.body);
    myData.save()
    .then(item => {
    req.flash("Success","Your response has been sent successfully");
    res.redirect("/contact");
    })
    .catch(err => {
    req.flash("error","Something is not right");
    });
   });

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","Please Login First");
    res.redirect("/sign-in");

};
//*******************************************************************************/

//render the index page 
app.get("/index",isLoggedIn,function(req,res){
//Weather.find({},function(err,weathers){
//    if(err){
//        console.log("Error!");
//    }else 
//    {
//     res.render("index", {weathers: weathers});
//    }
//});
//Weather.find({}).limit(1).exec(function(err,weathers){
  //  if(err){
    //    console.log("Error Occured");
    //}else
    //{
      //  res.render("index",{weathers: weathers});
   // }
//});
ThingSpeak.find({}).sort({"created_at":-1}).limit(1).exec(function(err,thingspeaks){
    if(err){
        console.log("Error Encountered");
    }else{
        res.render("index",{thingspeaks: thingspeaks});
    }

});
});

//render the devices page
app.get("/devices",isLoggedIn,function(req,res){
    res.render("devices");
});

//render the devices page
app.get("/chart",isLoggedIn,function(req,res){
    res.render("chart");
});

//render the visualization page
app.get("/visualization",isLoggedIn,function(req,res){
    ThingSpeak.find({}).sort({"created_at":-1}).exec(function(err,thingspeaks){
        if(err){
            console.log("Error Encountered");
        }else{
            //res.json(thingspeaks);
            res.render("visualization",{thingspeaks: thingspeaks});
            pushValues();
            
        }
    });
    
});
//render the contact page
app.get("/contact",isLoggedIn,function(req,res){
    res.render("contact");
});

function pushValues(){
    var resultArray =[];
    ThingSpeak.find({}).sort({"created_at":-1}).exec(function(err,thingspeaks){
        if(err){
            console.log("Error Encountered");
        }else{
            resultArray.push(thingspeaks);
            //console.log(resultArray.length);
        }
    });

}
function getWeather(){
    request("https://api.openweathermap.org/data/2.5/weather?id=184745&APPID=61f7b45beb602670ad05b8e6190fca44",function(error,response,body){
        if(!error && response.statusCode == 200){
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
        }else{
            console.log(error);
        }
    })};

setInterval(getWeather,600000);


function getThingsPeak(){
    request(" https://api.thingspeak.com/channels/973148/feeds.json?api_key=RD4AGYP7DUVPK5WQ&results=1",function(error,response,body){
        if(!error && response.statusCode == 200){
            var thingSpeakData = JSON.parse(body);
            let data=thingSpeakData.feeds
            data.forEach(async(each)=>{
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
            
        }else{
            console.log(error);
        }
    })};
//getThingsPeak()
setInterval(getThingsPeak,60000);
//Start Server 

// For http
httpServer.listen(8080,function(){
    console.log("Port 8080 is up and running");
});
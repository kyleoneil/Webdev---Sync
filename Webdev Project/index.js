const express = require('express');
const mongoose = require('mongoose');
const objectId = require('mongoose').objectId;
const passport = require("passport");
const bodyParser = require('body-parser');
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");

//new
const methodOverride = require('method-override');
const expressSanitizer  = require('express-sanitizer');
const Blog              = require('./models/blog');
//Comment           = require('./models/comment'),

const seedDB            = require('./seed');
//endofnew
mongoose.connect('mongodb://localhost/sync', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.set("view engine",'ejs');
app.use (bodyParser.urlencoded({extended:true}));
app.use(require("express-session")({
    secret: "It is a secret.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use("/styles",express.static(__dirname + "/styles"));
 app.use(express.static("public"));
 app.use(expressSanitizer());
app.use(methodOverride("_method"));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/',function(req,res){ 
    res.redirect("/landing");
});
app.get('/landing',function(req,res){
    res.render('landing');
})
app.get('/aboutus',function(req,res){ 
    res.render('aboutus');
});

app.get('/aboutus2',function(req,res){ 
    res.render('aboutus2');
});

app.get('/create',function(req,res){ 
    res.render('createteam');
});

//app.get('/landing',function(req,res){ 
//    res.render('landing');
//});
//sa mabaw unta ni v

app.get('/login',function(req,res){
    res.render('login');
});

app.get('/main', isLoggedIn, (req,res)=>{
    res.render('main');
});

app.post("/signup", (req, res) => {
    User.register(new User({
        username: req.body.username
    }), 
    req.body.password,
    // req.body.email,
    // req.body.surname,
    // req.body.password2,
    (error, user) => {
        if(error) {
            console.log(error);
            return res.render("signup");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("/login");
        });
    });
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/main",
    failureRedirect: "/login"
}),(req, res) => {});


app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// USER PROFILING
app.get('/ownProfile',function(req,res){
    res.redirect('Profile');
});

//index
app.get("/Profile", (req, res) => {
    User.find({}, (error, User) => {
        var user = req.user;
        if(error) {
            console.log("Error retrieving");
        } else {
            res.render("ownProfile", {User: user});
        }
    });
});


// EDITING PROFILE
app.get('/editProfile',function(req,res){
    User.find({}, (error, User) => {
        var user = req.user;
        if(error) {
            console.log("Error retrieving");
        } else {
            res.render("editProfile", {User: user});
        }
    });
});

app.post('/SaveProfile', function(req,res){
    User.find({}, (error, User) => {
        req.user.Age = req.body.age;
        req.user.Country = req.body.country;
        req.user.Address = req.body.address;
        req.user.save();
        if(error) {
            console.log("Error retrieving");
        } else {
            res.redirect("Profile");
        }
    });
});


app.get('/playerProfile',function(req,res){ 
    res.render('playerProfile');
});

app.get('/Recruitment',function(req,res){ 
    res.render('playerRecruitment');
});

 app.get('/signup',function(req,res){ 
     res.render('signup');
 });

//app.get('/application',function(req,res){ 
  //  res.render('teamapp');
//});

app.get('/tournaments',function(req,res){ 
    res.render('tournament');
});

app.get('/host',function(req,res){
    res.render('hosttorn');
});

app.get('/landing',function(req,res){
    res.render('landing')
})
app.get('/createteam',(req,res)=>{
    res.render('createteam')
});
//start of team creation posts
//root route
app.get("/application",(req,res)=>{
    res.redirect('/blogs');
});

//show
app.get("/blogs/:id", (req, res) => {
    Blog.findById(req.params.id, (error, blog) => {
        if(error) {
            res.redirect("/blogs");
        } else {
            res.render("team_info", {blog: blog});
        }
    });
});
app.get("/team_info",(req,res)=>{
    res.redirect("/blogs");
});
//index
app.get("/blogs", (req, res) => {
    Blog.find({}, (error, blogs) => {
        if(error) {
            console.log("Error retrieving");
        } else {
            res.render("teamapp", {blogs: blogs});
        }
    });
});
//new
app.get("/blogs/createteam", (req, res) => {
    res.render("blog/createteam");
});

//create
app.post('/blogs',(req,res)=>{
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, (error, newBlog) =>{
        if(error) {
            console.log("Error inserting.");
        } else {
            res.redirect("/blogs");
        }
    });
});


//edit
app.get("/blogs/:id/editteam", (req, res) => {
    Blog.findById(req.params.id, (error, blog) => {
        if(error) {
            res.redirect("/blogs");
        } else {
            res.render("editteam", {blog: blog});
        }
    });
});


//update
app.put("/blogs/:id", (req, res) => {
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, (error, updatedBlog) => {
        if(error) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/"+req.params.id);
        }
    });
});


//delete
app.delete("/blogs/:id", (req, res) => {
    Blog.findByIdAndRemove(req.params.id, (error) => {
        if(error) {
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});

//end of team creation posts
function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(3000,function (){
    console.log("welcome to sync, @3000");
});








    
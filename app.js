var express = require("express")
var bodyParser = require("body-parser");
app = express();
var mongoose = require("mongoose");


mongoose.connect("mongodb://localhost/blog_app", {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))


var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Omondi Robert",
//     image: "https://images.unsplash.com/photo-1447069387593-a5de0862481e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
//     body: "Hello and welcome to my blog here",

// })

//ROUTES
//INDEX ROUTE
app.get("/", function(req,res){
    res.redirect("/blogs")
})
app.get("/blogs", function(req,res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log("ERROR!!")
        }else{
            res.render("index", {blogs: blogs})
        }
    })
});

//NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new")
});
//CREAT ROUTE
app.post("/blogs", function(req, res){
    //create the blog
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new")
        }else{
            //redirect to index page
            res.redirect("/blogs")
        }
    })
});
//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if (err){
            res.redirect("/blogs")
        }else{
            res.render("show", {blog: foundBlog})
        }
    })
});

app.listen(3000, function(){
    console.log("Server Initiated")
})
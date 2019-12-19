var mongoose = require('mongoose');
var Blog = require('./models/blog');

var data = [
    {
        title: "Cloud's Rest",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHQeOEypO3DFPuSJbo4r7x-am1mhgzPLf858ox8zw6rzlCnxWn&s",
        body: String
    }
];

function seedDB() {
    Blog.remove({}, (err) => {
        if(err) {
            console.log(err);
        }
        console.log("Removed Blogs");
    });

    Blog.create();
}

module.exports = seedDB;


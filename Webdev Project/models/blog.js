const mongoose = require('mongoose');
const BlogSchema = new mongoose.Schema({
  //  title: String,
    //image: String,
    //body: String,
    //created: {type: Date, default: Date.now}
    game: String,
    teamname: String,
    email: String,
    locality: String,
    contact: String,
    captainname: String,
    picture: String
});

module.exports = mongoose.model("Blog", BlogSchema);
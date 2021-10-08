const mongoose = require("mongoose");
const { Schema } = mongoose;

const linkSchema = new Schema({
  destination:  String, // String is shorthand for {type: String}
  url: String,
  numOfClicks: Number,
  authorEmailId:String
});


const Link = mongoose.model('link',linkSchema);

module.exports = Link
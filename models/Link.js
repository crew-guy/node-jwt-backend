const mongoose = require("mongoose");
const { Schema } = mongoose;

const linkSchema = new Schema({
  destination:  String, // String is shorthand for {type: String}
  url: String,
  numOfClicks: Number,
  authorId:String
});


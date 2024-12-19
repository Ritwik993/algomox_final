const mongoose = require("mongoose");
const eventListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    id: {
      type: String,
      required: true,
    },
    secure_url: {
      type: String,
      required: true,
    },
  },
  category: {
    type: String,
    required: true,
  },
  ticket:{
    type: Number
  },
  date: {
    type: String
  },
  location:{
    type: String,

  },
  quantity: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("eventlist", eventListSchema);

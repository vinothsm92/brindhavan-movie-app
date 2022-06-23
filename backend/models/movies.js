const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  movieName: { type: String, unique: true, required: true },
  movieImage: { type: String, required: true },
  ticketPrice: { type: Number, required: true },
  gst: { type: Number, required: true },
  serviceCharge: { type: Number, required: true },
  createdDate: { type: Date, default: Date.now },
  createdBy: { type: Schema.ObjectId, required: true },
  udatedDate: { type: Date, default: Date.now },
  updatedBy: { type: Schema.ObjectId, required: true },
  isActive: { type: Boolean, default: true },
});



module.exports = mongoose.model("movies", schema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  movieName: { type: String, unique: true, required: true },
  ticketPrice: { type: Number, required: true },
  createdDate: { type: Date, default: Date.now },
  createdBy: { type: Schema.ObjectId, required: true },
  udatedDate: { type: Date, default: Date.now },
  updatedBy: { type: Schema.ObjectId, required: true },
  isActive: { type: Boolean, default: true },
});



module.exports = mongoose.model("movies", schema);

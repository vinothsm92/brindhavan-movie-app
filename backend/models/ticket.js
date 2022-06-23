const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  movieId: { type: Schema.ObjectId, required: true },
  date:{ type: Date, default: Date.now },
  showTime:{ type: Date },
  seats : { type : Array , default : [] },
  createdDate: { type: Date, default: Date.now },
  createdBy: { type: Schema.ObjectId, required: true },
  udatedDate: { type: Date, default: Date.now },
  updatedBy: { type: Schema.ObjectId, required: true },
  isActive: { type: Boolean, default: true },
});



module.exports = mongoose.model("tickets", schema);

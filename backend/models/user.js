const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  createdBy: { type: String, required: true },
  udatedDate: { type: Date, default: Date.now },
  updatedBy: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isApproved: { type: Boolean, default: true },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id, delete ret.password;
  },
});

module.exports = mongoose.model("User", schema);

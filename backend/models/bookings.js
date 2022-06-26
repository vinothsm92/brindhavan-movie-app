const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    movieId: { type: Schema.ObjectId, required: true },
    movieDate: { type: Date, default: Date.now },
    movieTiming: { type: String, required: true },
    seatSeletion: [
        {
            rowNo: { type: Number },
            columnNo: { type: Number },
            seatNo: { type: Number },
            isConfirmed: { type: Boolean, default: true },
        }],
    createdDate: { type: Date, default: Date.now },
    createdBy: { type: Schema.ObjectId, required: true },
    udatedDate: { type: Date, default: Date.now },
    updatedBy: { type: Schema.ObjectId, required: true },
    isActive: { type: Boolean, default: true },
   
});


module.exports = mongoose.model("bookings", schema);

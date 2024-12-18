const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
  rideId: { type: mongoose.Schema.Types.ObjectId, ref: "Ride" },
  name:{type:String,required:true},
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  rideDate: { type: Date, required: true },
  price:{type:Number},
  contactNumber:{type:Number,required:true},
  rideInfo: { type: String },
  duration: { type: String },
  availableSeats: { type: Number },
  bookingDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);

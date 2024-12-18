const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  name:{type:String,required:true},
  pickup: { type: String, required: true },
  dropoff: { type: String, required: true },
  price: { type: Number},
  contactNumber:{type:Number,required:true},
  rideDate: { type: Date, required: true },
  rideInfo: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;

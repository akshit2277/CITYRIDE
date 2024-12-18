var express = require("express");
var router = express.Router();
var db = require("../models");
var Ride = require("../models/Ride");

const path = require("path");
const { checklogin, newUser } = require("../Services/userservices");
const {
  generateToken,
  verifyToken,
  decodeToken,
} = require("../Services/jwtServices");
const booking = require("../models/booking");


/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", async function (req, res, next) {
  // console.log("CITYRIDE");
  let email = req.body.email;
  let password = req.body.password;
  console.log(email,password,"hiihuh");
  
  let user = await checklogin(email, password);
  console.log(user);
  if (user) {
    // Generate JWT token with user data
    const token = generateToken(user);
    // Send token as JSON response
    console.log("Token send Done");
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

router.post("/Signup", async function (req, res, next) {
  console.log("welcome");

  let user = req.body;
  console.log(user);
  let result = await newUser(user);
  if (result) {
    console.log("Done");
    console.log(result);
    const token = generateToken(user);
    // Send token as JSON response
    res.status(200).json({ token });
  } else {
    console.log("Errors");
    res.status(401).json({ message: "Error While Creating USer" });
  }
});

router.get("/Logout", async (req, res, next) => {
  res.status(200).json({ status: loggedOut });
});








router.post("/postRide",verifyToken, async (req, res) => {
  const { name,pickup, dropoff, price,contactNumber, rideDate, rideInfo } = req.body;

  try {
    const createdBy = req.user._id; 

    const newRide = new Ride({
      name,
      pickup,
      dropoff,
      price,
      contactNumber,
      rideDate,
      rideInfo,
      createdBy,
    });

    const savedRide = await newRide.save();
    res.status(201).json(savedRide);
  } catch (error) {
    console.error("Error saving ride:", error);
    res.status(500).json({ error: "Failed to save ride details" });
  }
});

router.post('/getRides', async (req, res) => {
  console.log("Req body",req.body);
  
  const { pickup, dropoff, date } = req.body;
  try {
    const rides = await db.Ride.find({
       pickup,
       dropoff,
       rideDate:date,
    });
    console.log(rides,"hdbvif");
    
    if (rides.length > 0) {
      res.status(200).json(rides);
    } else {
      res.status(404).json({ message: 'No rides found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rides', error });
  }
});





router.post("/rides/book", verifyToken, async (req, res) => {
  console.log("yellow");
  
  const userId = req.user._id; 

  const { rideId,pickup,
    dropoff,
    name,
    price,
    contactNumber,
    rideDate,
    rideInfo,
    duration,
    availableSeats, } = req.body;
 console.log(rideId,userId,"hoee");
 
  try {
    // Step 1: Find the ride_
    const ride = await Ride.findById({_id:rideId});
    console.log("hello death",ride);
    
    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    // Step 2: Check if seats are available
    if (ride.availableSeats <= 0) {
      return res.status(400).json({ message: "No seats available" });
    }


    // Step 3: Create a booking
    const booking = new db.Booking({
      userId,
      rideId,
      pickup,
      dropoff,
      name,
      price,
      contactNumber,
      rideDate,
      rideInfo,
      duration,
      availableSeats,
      bookingDate: new Date(),
    });
    await booking.save();
    console.log(booking,"hello");
    
    // Step 4: Decrease the available seats
    ride.availableSeats -= 1;
    await ride.save();

    res.status(200).json({ message: "Ride booked successfully", booking });
  } catch (error) {
    res.status(500).json({ message: "Error booking ride", error });
  }
});


// Fetch published rides
router.get("/rides/published", verifyToken, async (req, res) => {
  const userId = req.user._id;
  console.log("hi man",userId);
   // Assuming you have user authentication middleware
  try {
    const rides = await db.Ride.find({createdBy: userId});
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch published rides" });
  }
});

// Fetch booked rides
router.get("/rides/booked", verifyToken,async (req, res) => {
  const userId = req.user._id;
  console.log("hii",userId);
  try {
    const rides = await db.Booking.find({ userId })
    res.json(rides);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch booked rides" });
  }
});
// router.get("/rides/booked",verifyToken, async (req, res) => {
//   try {
//     // Extract token from request headers
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Token missing" });

//     // Verify and decode the token
//     const decoded = verifyToken(token);
//     const userId = decoded.user._id;

//     // Fetch rides booked by the user
//     const bookedRides = await booking.find({ userId });
//     res.status(200).json(bookedRides);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error fetching booked rides" });
//   }
// });



module.exports = router;





module.exports = router;





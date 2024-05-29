var express = require("express");
var router = express.Router();
var db = require("../models");
const path = require("path");
const { checklogin, newUser } = require("../Services/userservices");
const {
  generateToken,
  verifyToken,
  decodeToken,
} = require("../Services/jwtServices");
// const Location = require('./models/Location'); // Adjust the path as needed

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", async function (req, res, next) {
  console.log("CITYRIDE");
  let email = req.body.email[0];
  let password = req.body.password[0];
  let user = await checklogin(email, password);
  console.log("CITYRIDE");
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

// Route to save pickup and dropoff locations
router.post("/save-location", async (req, res) => {
  const { pickupAddress, dropoffAddress, distance, duration } = req.body;
  console.log(req.body);
  try {
    console.log("shrutu");

    const obj = {
      pickupAddress: pickupAddress,
      dropoffAddress: dropoffAddress,
      distance: distance,
      duration: duration,
    };
    const location = await db.locations.create(obj);
    console.log(location);
    res.status(201).json(location);
  } catch (error) {
    console.log("hola");

    res.status(500).json({ error: "Failed to save location" });
  }
});

router.post("/create-payment-intent", async (req, res) => {
  const { distance } = req.body;
  const fare = distance * 10; // Calculate fare

  try {
    const paymentIntent = await createPaymentIntent(fare);
    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create payment intent" });
  }
});

module.exports = router;

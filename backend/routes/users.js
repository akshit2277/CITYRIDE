var express = require('express');
var router = express.Router();
var db = require('../models');
const path = require('path');
const {checklogin, newUser} = require('../service/userService');
const { generateToken, verifyToken, decodeToken } = require('../service/jwtServices');
const { newTask, getAllTask, updateTaskStatus, deleteTask } = require('../service/taskService');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post("/Login",async function(req,res,next){
  console.log("CITYRIDE");
  let email = req.body.email;
  let password = req.body.password;
  let user = await checklogin(email,password);
  console.log("CITYRIDE");
  if (user) {
    // Generate JWT token with user data
    const token = generateToken(user);
    // Send token as JSON response
    console.log("Token send Done");
    res.status(200).json({ token });
} else {
    res.status(401).json({ message: 'Invalid username or password' });
}
});

router.post("/Signup",async function (req, res, next) {
  console.log("welcome")
  let user = req.body;
  let result = await newUser(user);
  if (result) {
    console.log("Done");
    console.log(result);
    const token = generateToken(user);
    // Send token as JSON response
    res.status(200).json({ token });
  }
  else {
    console.log("Errors");
    res.status(401).json({ message: 'Error While Creating USer' });
}
  
});

router.get("/Logout", async (req,res,next)=>{
  res.status(200).json({status: loggedOut})
})




module.exports = router;

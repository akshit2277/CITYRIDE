// const db = require("../models");
const database = require('../models');
// const bcrypt = require('bcrypt');
const {hashPass,comparePass} = require("./bcryptTest");

const newUser= async (user)=>{
    let newhashpassword = await hashPass(user.password);
    console.log(user.password + " " + newhashpassword); 
    user.hashPassword = newhashpassword;
    let dbuser =  await db.user.create({name: user.name, userName: user.userName,
         email: user.email, hashPassword: newhashpassword,
        userDescription: user.userDescription});
   
    return dbuser;

}

const checklogin = async (email,password) => {
    console.log(`Email is ${email} and Password is ${password} `);
    let user = await db.user.findOne({where : {email: email}});
    
    // console.log(user.password== password + "::::");

    //let h = await hashPass(password);
    
    // console.log(h + " and " + t);
    if(user){
        let t = await comparePass(password,user.hashPassword);
        if(t) return user;
        //console.log("dsnfhiohiewhwieohfewioh");
       
    }
    return false;
}
module.exports = {checklogin,newUser};
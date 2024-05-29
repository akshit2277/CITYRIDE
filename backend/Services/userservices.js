// const db = require("../models");
const db = require('../models');
// const bcrypt = require('bcrypt');
const {hashPass,comparePass} = require("./bcryptTest");

const newUser= async (user)=>{
    let newhashpassword = await hashPass(user.password[0]);
    console.log(user.password[0] + " " + newhashpassword); 
    user.hashPassword = newhashpassword;
    let dbuser =  await db.users.create({name: user.name[0], 
         email: user.email[0], passwordhash: newhashpassword
        });
   
    return dbuser;

}

const checklogin = async (email,password) => {
    console.log(`Email is ${email} and Password is ${password} `);
    let user = await db.users.findOne({where : {email: email}});
    
    // console.log(user.password== password + "::::");

    //let h = await hashPass(password);
    
    // console.log(h + " and " + t);
    if(user){
        let t = await comparePass(password,user.passwordhash);
        if(t) return user;
        //console.log("dsnfhiohiewhwieohfewioh");
       
    }
    return false;
}
module.exports = {checklogin,newUser};
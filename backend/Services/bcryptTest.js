const  bcrypt = require('bcrypt');
const { toNamespacedPath } = require('path');

async function hashPass(pass){
    var rounds =10;
   // console.log("bro i have password value : "+ pass);
    let salt = await bcrypt.genSalt(rounds);
    let hash = await bcrypt.hash(pass,salt);
   // console.log("bro i have password value : "+ hash);
    return hash;
}
async function comparePass(pass,hash){
    console.log(pass,hash,"ggggg");

    let ans = await bcrypt.compare(pass,hash);
    
    return ans;
}

module.exports= {hashPass,comparePass};
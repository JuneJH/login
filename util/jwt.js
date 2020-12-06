const secrete = "ad1d1f3ce852";
const jwt = require("jsonwebtoken");

exports.publish = function (maxAge = 3600 * 24,info={}){
    const token = jwt.sign(info,secrete,{
        expiresIn:maxAge
    })
    return token;
}
exports.verify = function (token){
    try{
        const result = jwt.verify(token,secrete);
        return  result;
    }catch (err){
        return  null;
    }
}
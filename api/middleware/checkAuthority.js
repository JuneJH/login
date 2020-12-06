const {errRes} = require("../../util/response");
const {verify} = require("../../util/jwt");

const passApi = [{
    url:"/register",
    method:"POST",
},{
    url:"/login",
    method: "POST"
}]
module.exports = function(req, res,next){
    const isPass = passApi.some(api=>api.url === req.url && api.method === (req.method.toUpperCase()));
    if(isPass){
        next();
        return ;
    }
    const token = req.headers.authorization;
    if(!token){
        errRes(res,401,"未登录","请先登录");
        return ;
    }
    const user = verify(token);
    if(!user){
        errRes(res,403,"身份已过期","请重新登录，你的身份已经过期");
        return ;
    }
    req.user = user;
    next();
}

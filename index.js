const express = require("express");
const app = express();
const log4js = require("log4js");
const multer = require("multer");
const {errRes} = require("./util/response");
const {loginLogger} = require("./log/loginit")
const path = require("path");

// 使用头像
app.use(express.static(path.resolve(__dirname, "./assets")))
// 解析参数
app.use(express.urlencoded({extended:true}));
app.use(express.json());
// 验证权限
app.use(require("./api/middleware/checkAuthority"))
// 日志
app.use(log4js.connectLogger(loginLogger,{
    level:"auto"
}))
// api
app.use(require("./api/admin"));
// 处理错误
app.use((err,req,res,next)=>{
    if(err){
        if(err instanceof multer.MulterError){
            errRes(res,400,undefined,err.message);
            return ;
        }
        errRes(res,500)
    }else{
        next();
    }
})
app.listen(9527,()=>{
    console.log("开启服务");
})
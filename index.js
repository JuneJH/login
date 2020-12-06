const express = require("express");
const app = express();
const log4js = require("log4js");
const multer = require("multer");
const {errRes} = require("./util/response");
const {loginLogger} = require("./log/loginit")
const path = require("path");

app.use(express.static(path.resolve(__dirname, "./assets")))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(require("./api/middleware/checkAuthority"))




app.use(log4js.connectLogger(loginLogger,{
    level:"auto"
}))
app.use(require("./api/admin"));

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
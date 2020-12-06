const express = require('express');
const {pickProps} = require("../util/tool");
const {publish} = require("../util/jwt");
const {errRes,succeed} = require("../util/response");
const multer = require("multer");
const path =require("path");
const router = express.Router();
const {addAdmin,login,updateAdmin,getAdminByUsername,getAdminById} = require("../services/adminService");
// 注册
router.post("/register",async (req,res)=>{
    const results = await addAdmin(req.body);
    if(results.isOk){
        const user = pickProps(results.succeed.toJSON(),"id","username","mobile","email","count")
        succeed(res,200,"注册成功",user)
    }else{
        errRes(res,400,"参数验证不通过",results.err)
    }
});
// 更改个人信息
router.patch("/update",async (req,res)=>{
    let results = await updateAdmin(req.user.id,req.body);
    if(results.isOk){
        let newAdmin =await getAdminById(req.user.id);
        newAdmin = pickProps(newAdmin,"id","username","mobile","email","count","headerImg")
        const  token = publish(3600*7,newAdmin);
        res.header("authorization",token);
        succeed(res,200,"修改成功",newAdmin);
    }else{
        errRes(res,400,"参数验证不通过",results.err)
    }
})
router.post("/login",async (req,res)=>{
    let results = await login(req.body.username,req.body.password);
    if(results){
        results = results.toJSON();
        results = pickProps(results,"id","username","mobile","email","count","headerImg")
        await updateAdmin(results.id,{count:results.count + 1})
        const  token = publish(3600*7,results);
        res.header("authorization",token);
        succeed(res,200,"登录成功",results);
    }else{
        errRes(res,400,"用户名和密码不匹配",{})
    }
})
router.get("/whoIam", async (req, res) => {
    let results = await getAdminByUsername(req.user.username);
    if (results) {
        results = pickProps(results, "username", "mobile", "email", "count","headerImg");
        succeed(res, 200, "获取成功", results)
    } else {
        errRes(res, 500, "目前没有相关信息", "获取失败")
    }
});

// 上传头像
const headerImgPath = path.resolve(__dirname, "../assets/headerImg")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, headerImgPath)
    },
    filename: function (req, file, cb) {
        const suffix = path.extname(file.originalname);
        const fileName =Date.now() + Math.random(36).toString().slice(-6) + suffix;
        cb(null, fileName)
    }
})
router.post("/uploadHeaderImg",multer({storage,limits:{fileSize: 700 * 1024}}).single("headerImg"),async (req,res)=>{
    const headerPath = path.join("/headerImg", req.file.filename);
    const result = await updateAdmin(req.user.id,{headerImg:headerPath})
    if(result.isOk){
        succeed(res,200,"修改成功","成功修改头像")
    }else{
        errRes(res,500,"服务器已收到你的请求","正在处理中")
    }
})


module.exports = router;
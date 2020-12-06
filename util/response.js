exports.errRes = (res,code,msg="服务端已收到你的请求，但是你的参数不符合我们得要求",err) =>{
    res.status(code).send({
        code,
        data:err,
        msg,
    });
}

exports.succeed= (res,code=200,msg="请求成功",data)=>{
    res.status(code).send({
        code,
        data:data,
        msg
    });
}
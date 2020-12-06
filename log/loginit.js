const log4js = require("log4js");
const path = require("path");
log4js.configure({
    appenders:{
        sql:{
            type:"dateFile",
            filename:path.resolve(__dirname, "mysql","sql.log"),
            maxSize:1024*1024,
        },
        login:{
            type:"dateFile",
            filename:path.resolve(__dirname, "login","login.log"),
        },
        default:{
            type:"stdout"
        }
    },
    categories:{
        sql:{
            appenders:["sql"],
            level:"all",
        },
        login:{
            appenders:["login"],
            level:"all"
        },
        default:{
            appenders:["default"],
            level:"all"
        }
    }
})

// 防止服务器意外终止而无法写入完整的日志

process.on("exit",()=>{
    log4js.shutdown();
})

exports.sqlLogger = log4js.getLogger("sql");
exports.loginLogger = log4js.getLogger("login");
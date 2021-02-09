const {sqlLogger} = require("../log/loginit");
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("login","主机账户","主机密码",{
    host:"",// 主机地址
    dialect:"mysql",
    logging:(msg)=>{
        sqlLogger.info(msg)
    }
})

module.exports = sequelize;

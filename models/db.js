const {sqlLogger} = require("../log/loginit");
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("database","username","password",{
    host:"host",
    dialect:"mysql",
    logging:(msg)=>{
        sqlLogger.info(msg)
    }
})

module.exports = sequelize;

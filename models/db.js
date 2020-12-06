const {sqlLogger} = require("../log/loginit");
const {Sequelize} = require('sequelize');

const sequelize = new Sequelize("login","root","root",{
    host:"121.36.51.141",
    dialect:"mysql",
    logging:(msg)=>{
        sqlLogger.info(msg)
    }
})

module.exports = sequelize;

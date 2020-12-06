const sequelize = require("./db");
const {DataTypes} = require("sequelize");

const Admin = sequelize.define("Admin", {
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique: true
    },
    password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    mobile:{
        type:DataTypes.STRING,
    },
    email:{
        type:DataTypes.STRING,
    },
    count:{
        type:DataTypes.INTEGER,
    },
    headerImg:{
        type:DataTypes.STRING,
    }
},{
    paranoid:true,
})
// sequelize.sync({alter:true}).then(()=>{
//     console.log("同步完成")
// })
module.exports = Admin;
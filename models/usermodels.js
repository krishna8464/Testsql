const {sequelize,DataTypes}= require("../config/db");

const Users = sequelize.define("users",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING(32),
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING(32),
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING(200),
        allowNull:false
    }
})

module.exports={
    Users
}
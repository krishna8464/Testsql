const {sequelize,DataTypes}= require("../config/db");

const Orders = sequelize.define("orders",{
    orderid:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    Status:{
        type:DataTypes.STRING,
        defaultValue:"confirmed"
    }
})

module.exports={
    Orders
}
const {sequelize,DataTypes}= require("../config/db");

const Timelines = sequelize.define("timelines",{
    orderid:{
        type:DataTypes.INTEGER
    },
    previous_state:{
        type:DataTypes.STRING,
        defaultValue:"confirmed"
    },
    new_state:{
        type:DataTypes.STRING,
        defaultValue:"confirmed"
    }
})

module.exports={
    Timelines
}
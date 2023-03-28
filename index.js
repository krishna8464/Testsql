const express = require("express");
const {sequelize,DataTypes} = require("./config/db");
const {userRoute}= require("./routes/user.route");
const {orderRoute}=require("./routes/orders.route")
require("dotenv").config


const app = express();
app.use(express.json());

app.get("/",(req,res)=>{
   res.send("welcome")
})

sequelize.authenticate()
.then(()=> console.log('connection successfull'))
.catch((err)=> console.log("Failed to connect",process.env.Username));

app.use("/order",orderRoute)
app.use("/user",userRoute)


app.listen(process.env.Port,()=>{
   console.log("Server Started At SQL",process.env.Port);
})

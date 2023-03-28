const {Orders}= require("../models/ordersmodel");
const {Timelines}=require("../models/timelinemodel")
const {sequelize,DataTypes} = require("../config/db")
const express = require("express");
require("dotenv").config();

const orderRoute = express.Router();



//register route
orderRoute.post("/create",async(req,res)=>{
       try {
        const {name,email,address} = req.body;
        
                sequelize.sync()
                .then(async()=>{
                    await Orders.create({name,email,address})
                })
                .then(async()=>{
                    let data = await Orders.findAll({
                        where:{
                            email
                        }
                    })
                    Timelines.create({orderid:data.orderid})
                    res.send("Success")
                }).catch((error)=>{res.send("order created succesfully")});
                
       } catch (error) {
        res.send({err : "Route not working"})
       }
     
})


orderRoute.get("/details",async(req,res)=>{
    let data = await Orders.findAll();
    res.send(data)
})


module.exports={
    orderRoute
}
const {Users}= require("../models/usermodels");
const {sequelize,DataTypes} = require("../config/db")
const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRoute = express.Router();



//register route
userRoute.post("/register",async(req,res)=>{
       try {
        const {name,email,password} = req.body;
        bcrypt.hash(password,5,async(err,val)=>{
            if(err){
                res.send("something went wrong in password hasing")
            }else{
                let data = await registeruser({name,email,password:val})
                // console.log(data)
                if(data.errors){
                    res.send("User already registerd");
                    // "User already registerd"
                 }else{
                    res.send("User registration successfull")
                    // "User registration successfull"
                 }
            }
        })
       } catch (error) {
        res.send({err : "Route not working"})
       }
     
})

async function registeruser(body){
   try {
    await sequelize.sync()
    let data = await Users.bulkCreate([
        body
    ])
    return data
   } catch (error) {
    return error
   } 
}


//login route
userRoute.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try {
        const data = await Users.findAll({
            where:{
                email
            }
        })
        if(data.length===0){
            res.send("User Not Registerd with this mail id")
        }else{
            const hashpass = data[0].password;
            bcrypt.compare(password,hashpass,(err,result)=>{
                if(err){
                    res.send("Wrong Credntials")
                }else{
                    const token = jwt.sign({userid:data[0].id},process.env.key);
                    res.send({"msg":"Login Successfull","username":data[0].name,"email":data[0].email,"Access_Tocken":token})
                }
            })
        }
    } catch (error) {
        res.send("Some thing went bad in userroute")
    }
})




module.exports={
    userRoute
}
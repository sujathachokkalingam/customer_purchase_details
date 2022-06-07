const express=require("express")
const app=express();
const mongoose=require("mongoose")
const multer=require("multer")
const path=require("path")
const morgan=require("morgan")
const csvtojson = require('csvtojson'); 
const fs=require("fs")
const csv=require("fast-csv")
require("dotenv/config");
var session = require('express-session');
var flash = require('connect-flash');
const csvModel=require("./model/productschema.js")
const port=process.env.PORT||9000;
const productrouter=require("./router/productrouter.js")
const userrouter=require("./router/userrouter.js")
const orderrouter=require("./router/orderrouter.js");

//mongodb connection
//mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL,
    {useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>{
        console.log("db connected successfull")
    })
    .catch(error=>{
        console.log(err.message);
        process.exit(1);
    })
  //storage code
  


    //middlewares
    app.use(morgan("dev"))
    app.use(express.json())
    app.use("/api/product/v1",productrouter);
    app.use("/api/user/v1",userrouter);
    app.use("/api/order/v1",orderrouter);



    




//assign port
app.listen(port,()=>{
    console.log("server running in port ${9000}")
});
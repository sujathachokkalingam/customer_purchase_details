const express=require("express");
const router=express.Router();
var csv = require("fast-csv");
var fs = require('fs');
const upload=require("../auth/auth.js");
const productcontroller=require("../controller/productcontroller.js");

router.get("/products",(req,res)=>{
    productcontroller.allproducts(req,res);
})

router.post("/upload", upload.single("sujatha"), function(req, res,next){
    productcontroller.Stream(req,res);
});

module.exports=router;
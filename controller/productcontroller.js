const fs = require("fs")
const fastcsv = require("fast-csv")
const req = require("express/lib/request");
const mongoose = require("mongoose");
const csvtojson = require("csvtojson");
const res = require("express/lib/response");
const model = require("../model/productschema.js")
const path = require('path')

var Stream = function (req, res, next) {
  //csvtojson conversion
  csvtojson()
    .fromFile("sujatha.csv")
    .then(csvData => {
      console.log(csvData)
    })
    .catch(error => {
      console.log("error");
    });
  //path resolving
  console.log("current directory:", __dirname);
  let path1 = path.resolve("uploads")
  console.log(path1)
  uploads = path1 + "/" + req.file.filename;
  //readStream
  let products = [];
  fs.createReadStream(uploads)
    .pipe(fastcsv.parse({ headers: true,ignoreEmpty:true}))
    .on("error", (error) => {
      throw error.message;
    })
    .on("data", (row) => {
      console.log(row)
    products.push({
      name:row.name,
      price:row.price,
      catagory:row.catagory,
      discription:row.discription,
      manufacturer:row.manufacturer
    })
  })
    .on("end", () => {
      
    model.insertMany(products, (err, data) => {
        if (err) throw err;
      
        res.status(200).json({ message: "success" });

      })
    });
};
const allproducts=async(req,res)=>{
  
  try{
    const result=await model.find({})
    res.send(result)
  }
  catch(error){
    console.log(error);
  }
}

module.exports = { Stream,
                    allproducts};
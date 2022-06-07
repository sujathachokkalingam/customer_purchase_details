const mongoose=require("mongoose")
const orderschema=new mongoose.Schema({
    orderID:{type:String,required:true},
    productID:{type:Number,required:true},
    customerid:{type:String,required:true},
    customerName:{type:String,required:true},
    productName:{type:String,required:true},
    Quantity:{type:Number,required:true},
    price:{type:Number,required:true},
    ordercreationdate:{type:Date,required:true},
    address:{type:String,required:true}
},
{timestamps:true}
);

module.exports=mongoose.model("order",orderschema);
const mongoose=require("mongoose")
const productschema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    catagory:{
        type:String,
        require:true
    },
    discription:{
        type:String,
        require:true
    },
    manufacturer:{
        type:String,
        require:true
    },
},
{ timestamps: true });


module.exports=mongoose.model("Products",productschema);
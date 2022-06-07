const { default: mongoose } = require('mongoose')
const momgoose=require('mongoose')

const userSchema=new mongoose.Schema({
    first_name:{type:String,required:true,default:null},
    last_name:{type:String,required:true,default:null},
    email:{type:String,unique:true,default:null,lowercase:true},
    password:{type:String},
    token:{type:String}
})

module.exports=mongoose.model('user',userSchema);
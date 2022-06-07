const express=require("express")
const order=require("../model/orderschema.js")

const listoforder=async(req,res)=>{
    try{
        const result=await order.find({})
        res.status(200).json(result)
        console.log(result)
    }
    catch(error){
        res.status(400).json("something went wrong......!")
    }
}

const createorder = (async(req, res) => {
    
     try{
         const neworder = new order ({
        orderID:req.body.orderID,
        productID: req.body.productID,
        customerid:req.body.customerid,
        customerName:req.body.customerName,
        productName:req.body.productName,
        Quantity:req.body.Quantity,
        price:req.body.price,
        ordercreationdate:new Date(req.body.ordercreationdate),
        address:req.body.address,
    })
    const savedorder=await neworder.save();
    res.status(201).json(savedorder)
}
catch(error){
    res.status(400).json("oder doesnot create........!");
};
    
});

const updateorder = (async(req, res) => {
    productID=req.body.productID,
    Quantity=req.body.Quantity
    order.findOneAndUpdate({id:productID},{$set:{Quantity}},{new:false},(err,data)=>{
        if(data==null)
        {
            res.send("nothing found")
        }
        else{
            res.send(data);
        }
    })
    
})


const cancelorder=(async(req,res)=>{
    productID=req.body.productID
    order.findOneAndDelete(({id:productID}),(err,data)=>{
        if(data==null){
            res.send("wrong id")
        }
        else{
            res.send("order cancelled")



        }
    })
})

const sortorder=(async(req,res)=>{
    try{
    const result=await order.find({})
    .sort({customerid:-1})
    
    //.limit(1)
    res.send(result)
    }
    catch(error){
        res.send(error);
    }
})


const searching=(async(req,res)=>{
    const data=await order.find({  "$or":[ {productName:{$regex:req.params.key}  }] })
    res.send(data);
    console.log(req.params.key);
})
// const searching=(async (req,res)=>{
//     console.log(req.body.productName)
//     const productName=req.body.productName;
//     const result=await order.find(({$or:[{"productName":{$regex:`${productName}`,$options:"i"}}]}),(err,data)=>{
//         if(data==null){
//             res.send("doesnot search")
//         }
//         else{
//             res.send(data);

//         }
//     }).clone()
    
   
// })

// const dateproducts=(async(req,res,next)=>{
// try{

// //let id=order.customerid
// let fromDate = req.body.from_date + " 00:00:00"
// let toDate = req.body.to_date + " 23:59:59"
// const data=await order.find({ordercreationdate:{$gt:new Date('2022-05-01'),$lt:new Date('2022-05-31')}//,customerName:"sujatha"
// }).count()
// .sort({ordercreationdate:-1})
// res.status(200).json(data)
// console.log(data)
// }

// catch(error){
//     res.send(400).json(error)
// }
// });
const dateproducts=(async(req,res,next)=>{
    order.aggregate([
        {
            $group:{
                _id:{ordercreationdate:"$ordercreationdate"},
                totalorder:{$sum:1},
            
                
            }
        }
    ]).then(result=>{
        console.log(result)
        res.status(200).json(result)
    })
    .catch(error=>{
        console.log(error)
    })
})




const customer=(async(req,res,next)=>{
    try{
    const data=await order.find({})
    .count({customerid:"1013"})
    res.status(200).json(data)
    }
    catch(error){
        res.status(400).json(err.message)
    }
})


module.exports={createorder,
                listoforder,
                updateorder,
               cancelorder,
               sortorder,
               searching,
               dateproducts,
            customer
            };
const express=require("express")
const router=express.Router();
const ordercontroller=require("../controller/ordercontroller.js");

router.get("/allorder",ordercontroller.listoforder);
router.post("/createorder",ordercontroller.createorder)
router.put("/:id",ordercontroller.updateorder)
router.delete("/:id",ordercontroller.cancelorder)
router.get("/sort",ordercontroller.sortorder)
router.get("/search/:key",ordercontroller.searching)
router.get("/date",ordercontroller.dateproducts);
router.get("/customer",ordercontroller.customer)

module.exports=router;
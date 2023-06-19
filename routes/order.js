const Order = require("../models/Order");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken");

const router = require("express").Router();


//CREATE
router.post("/",verifyToken, async (req,res)=>{
    const newOrder = new Order(req.body)

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);

    }catch(err){
        res.status(404).json(err);
    }
    
});


//UPDATE
router.put("/:id",verifyTokenAndAdmin, async (req,res)=>{
   try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set:req.body
        },
        {new:true}
    );
    res.status(200).json(updatedOrder);

    }catch(err){
        res.status(404).json(err);
    }

});

//DELETE
router.delete("/:id",verifyTokenAndAdmin, async(req,res)=>{
    try{
        await Order.findByIdAndDelate(req.params.id)
        res.status(200).json("Order has been deleted...")

    }catch(err){
        res.status(404).json(err);
    }
});


//GET USER ORDER
router.get("/find/:userId",verifyTokenAndAuthorization, async(req,res)=>{
    try{
        const orders = await Order.find(userId, req.params.userId);
        res.status(200).json(order);
    }catch(err){
        res.status(404).json(err);
    }
});

//GET ALL
router.get("/",verifyTokenAndAdmin, async (req,res)=>{
    try{
        const orders = await Order.find()
        res.status(200).json(Order);

    }catch(err){
        res.status(404).json(err);

    }
});


module.exports = router;

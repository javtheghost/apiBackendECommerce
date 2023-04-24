const Coupon = require("../models/coupon");
const validateMongoDbId = require("../utils/validateMongobdId");
const asyncHandler = require("express-async-handler");

const createCoupon = asyncHandler(async (req, res) =>{
    try{
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    }catch(error)
    {throw new Error(error)}
});


const getCoupon = asyncHandler(async(req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const findCoupon = await Coupon.findById(id);
        res.json(findCoupon);
    }catch(error){throw new Error(error)};
});



const updateCoupon = asyncHandler(async (req, res) =>{
    const {id} = req.params;v
    validateMongoDbId(id);
    try{
        const updateCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json({message: "Se ha actualizado",updateCoupon});
    }catch(error){throw new Error(error)}
});


const getAllCoupon= asyncHandler(async(req, res) =>{
    try{
        const findAllCoupon = await Coupon.find();
        res.json(findAllCoupon);
    }catch(error){throw new Error(error)};
});
const deleteCoupon = asyncHandler(async (req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const deleteCoupon = await Coupon.findByIdAndDelete(id);
        res.json({message: "Se ha eliminado", deleteCoupon});
    }catch(error){throw new Error(error)}
});

module.exports = {createCoupon, getCoupon, getAllCoupon, updateCoupon, deleteCoupon};

const Brand = require("../models/brand");
const validateMongoDbId = require("../utils/validateMongobdId");
const asyncHandler = require("express-async-handler");

const createBrand = asyncHandler(async (req, res) =>{
    try{
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    }catch(error)
    {throw new Error(error)}
});


const getBrand = asyncHandler(async(req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const findBrand = await Brand.findById(id);
        res.json(findBrand);
    }catch(error){throw new Error(error)};
});



const updateBrand = asyncHandler(async (req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const updateBrand = await Brand.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json({message: "Updated Successfull", brandUpdated: updateBrand});
    }catch(error){throw new Error(error)}
});


const getAllBrand= asyncHandler(async(req, res) =>{
    try{
        const findAllBrand = await Brand.find();
        res.json(findAllBrand);
    }catch(error){throw new Error(error)};
});
const deleteBrand = asyncHandler(async (req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const deleteBrand = await Brand.findByIdAndDelete(id);
        res.json({message: "Deleted Successfull", BrandDeleted: deleteBrand});
    }catch(error){throw new Error(error)}
});

module.exports = {createBrand, getBrand, getAllBrand, updateBrand, deleteBrand};

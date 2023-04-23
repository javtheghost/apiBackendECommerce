const Category = require("../models/category");
const validateMongoDbId = require("../utils/validateMongobdId");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) =>{
    try{
        const newCategory = await Category.create(req.body);
        res.json(newCategory);
    }catch(error)
    {throw new Error(error)}
});


const getCategory = asyncHandler(async(req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const findCategory = await Category.findById(id);
        res.json(findCategory);
    }catch(error){throw new Error(error)};
});



const updateCategory = asyncHandler(async (req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const updateCategory = await Category.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json({message: "Se ha actualizado",updateCategory});
    }catch(error){throw new Error(error)}
});


const getAllCategory= asyncHandler(async(req, res) =>{
    try{
        const findAllCategory = await Category.find();
        res.json(findAllCategory);
    }catch(error){throw new Error(error)};
});
const deleteCategory = asyncHandler(async (req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const deleteCategory = await Category.findByIdAndDelete(id);
        res.json({message: "Se ha eliminado", deleteCategory});
    }catch(error){throw new Error(error)}
});

module.exports = {createCategory, getCategory, getAllCategory, updateCategory, deleteCategory};

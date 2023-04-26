const Color = require("../models/color");
const validateMongoDbId = require("../utils/validateMongobdId");
const asyncHandler = require("express-async-handler");

const createColor = asyncHandler(async (req, res) =>{
    try{
        const newColor = await Color.create(req.body);
        res.json(newColor);
    }catch(error)
    {throw new Error(error)}
});


const getColor = asyncHandler(async(req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const findColor = await Color.findById(id);
        res.json(findColor);
    }catch(error){throw new Error(error)};
});



const updateColor = asyncHandler(async (req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const updateColor = await Color.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json({message: "Updated Successfull", ColorUpdated: updateColor});
    }catch(error){throw new Error(error)}
});


const getAllColor= asyncHandler(async(req, res) =>{
    try{
        const findAllColor = await Color.find();
        res.json(findAllColor);
    }catch(error){throw new Error(error)};
});
const deleteColor = asyncHandler(async (req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const deleteColor = await Color.findByIdAndDelete(id);
        res.json({message: "Deleted Successfull", ColorDeleted: deleteColor});
    }catch(error){throw new Error(error)}
});

module.exports = {createColor, getColor, getAllColor, updateColor, deleteColor};

const Enquiry = require("../models/enquiry");
const validateMongoDbId = require("../utils/validateMongobdId");
const asyncHandler = require("express-async-handler");

const createEnquiry = asyncHandler(async (req, res) =>{
    try{
        const newEnquiry = await Enquiry.create(req.body);
        res.json({message: "Create successfull", newEnquiry: newEnquiry});
    }catch(error)
    {throw new Error(error)}
});


const getEnquiry = asyncHandler(async(req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const findEnquiry = await Enquiry.findById(id);
        res.json(findEnquiry);
    }catch(error){throw new Error(error)};
});



const updateEnquiry = asyncHandler(async (req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const updateEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json({message: "Updated Successfull", EnquiryUpdated: updateEnquiry});
    }catch(error){throw new Error(error)}
});


const getAllEnquiry= asyncHandler(async(req, res) =>{
    try{
        const findAllEnquiry = await Enquiry.find();
        res.json(findAllEnquiry);
    }catch(error){throw new Error(error)};
});
const deleteEnquiry = asyncHandler(async (req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const deleteEnquiry = await Enquiry.findByIdAndDelete(id);
        res.json({message: "Deleted Successfull", EnquiryDeleted: deleteEnquiry});
    }catch(error){throw new Error(error)}
});

module.exports = {createEnquiry, getEnquiry, getAllEnquiry, updateEnquiry, deleteEnquiry};

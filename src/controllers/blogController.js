const Blog = require("../models/blog");
const user = require("../models/user");
const User = require("../models/user");
const validateMongoDbId = require("../utils/validateMongobdId");
const asyncHandler = require("express-async-handler");

const createBlog = asyncHandler(async (req, res) =>{
    try{
        const newBlog = await Blog.create(req.body);
        res.json(newBlog);
    }catch(error)
    {throw new Error(error)}
});


const updateBlog = asyncHandler(async (req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json({message: "Se ha actualizado",updateBlog});
    }catch(error){throw new Error(error)}
});


const getBlog = asyncHandler(async (req, res) =>{
    console.log(req.params)
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const getBlog = await Blog.findById(id)
        .populate("likes")
        .populate("dislikes");
        const updateViewsupdateViews = await Blog.findByIdAndUpdate(id,
            {
                $inc: {numViews:1},
            },
            {new: true}
        );
        res.json(getBlog);
    }catch(error)
    {throw new Error(error)}
});

const getAllBlogs = asyncHandler(async (req, res) =>{
    try{
        const getBlogs = await Blog.find();
        res.json(getBlogs);
    }catch(error)
    {throw new Error(error)}
});

const deleteBlog = asyncHandler(async (req, res) =>{
    const {id} = req.params;
    validateMongoDbId(id);
    try{
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json({message: "Se ha eliminado", deleteBlog});
    }catch(error){throw new Error(error)}
});


const likeTheBlog = asyncHandler(async (req, res) =>{
    const {blogId} = req.body;
    validateMongoDbId(blogId);
    //busca el blog cual necesita ser me gusta
    const blog = await Blog.findById(blogId);
    //busca el usuario logeado
    const loginUserId = req.user?._id;
    //busca  si el usuario tiene me gusta en el blog
    const isLiked = blog?.isLiked;
    //busca si el usuario tiene no me gusta en el bloh
    const alreadyDisliked = blog?.dislikes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
        );

    if(alreadyDisliked){
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
            $pull: {dislikes: loginUserId},
            isDisliked:false
            },
            {new: true}
        );
        res.json(blog);
    }

    if(isLiked){
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
            $pull: {dislikes: loginUserId},
            isLiked:false
            },
            {new: true}
        );
        res.json(blog);
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
            $push: {likes: loginUserId},
            isLiked:true
            },
            {new: true}
        );
        res.json(blog);
    }
});


const dislikeBlog = asyncHandler(async (req, res) =>{
    const {blogId} = req.body;
    validateMongoDbId(blogId);
    //busca el blog cual necesita ser me gusta
    const blog = await Blog.findById(blogId);
    //busca el usuario logeado
    const loginUserId = req.user?._id;
    //busca  si el usuario tiene me gusta en el blog
    const isDisliked = blog?.isDisliked;
    //busca si el usuario tiene no me gusta en el bloh
    const alreadyLiked = blog?.likes?.find(
        (userId) => userId?.toString() === loginUserId?.toString()
        );

    if(alreadyLiked){
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
            $pull: {likes: loginUserId},
            isLiked:false,
            },
            {new: true}
        );
        res.json(blog);
    }

    if(isDisliked){
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
            $pull: {dislikes: loginUserId},
            isDisliked:false,
            },
            {new: true}
        );
        res.json(blog);
    }else{
        const blog = await Blog.findByIdAndUpdate(blogId,
            {
            $push: {dislikes: loginUserId},
            isDisliked:true
            },
            {new: true}
        );
        res.json(blog);
    }
});
module.exports = {createBlog, updateBlog, getBlog,
getAllBlogs,deleteBlog, likeTheBlog, dislikeBlog};
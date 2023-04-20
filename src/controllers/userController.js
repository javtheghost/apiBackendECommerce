const { generateToken } = require("../config/jwtToken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

//crear usuario
const createUser = asyncHandler (async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser){
        const newUser = await User.create(req.body);
        res.json(newUser);
        
    }else{
        throw new Error("User already exists");
    }
});

const loginUserCtrl = asyncHandler(async (req, res) =>{
    const {email, password} = req.body;
    //checar si el usuario existe
    const findUser = await User.findOne({ email });
    if(findUser && await findUser.isPasswordMatched(password)){
        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            token: generateToken(findUser?._id),
        });
        
    }else{ throw new Error("Invalid Credentials"); }
});


//get all users

const getAllUser = asyncHandler(async (req, res) =>{
    try{
        const getUsers = await User.find();
        res.json(getUsers);
    }catch(error){throw new Error(error)}
});

//obtener un usuario
const getaUser = asyncHandler(async (req, res) => {
    const {id} = req.params;
    try{
        const getUser = await User.findById(id);
        res.json({
            getUser,
        });

    }catch (error){
        throw new Error(error);
    }
});

const deleteUser = asyncHandler(async(req, res) =>{
    const { _id } = req.params;
    try{
        const deleteUser = await User.findByIdAndDelete(_id);
        res.json({
            deleteUser,
        });
    }catch (error){
        throw new Error(error);
    }
});

const updateUser = asyncHandler( async (req, res) =>{
    
    const { _id } = req.user;
    try{
        const updateUser = await User.findByIdAndUpdate(_id, {
            firstname: req?.body.firstname,
            lastname: req?.body.lastname,
            email: req?.body.email,
        },
        {
            new: true,
        }
    );
    res.json(updateUser);
    }catch (error){throw new Error (error);
}});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const blockUser = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({message: "¡Usuario bloqueado!",blockUser});
  } catch (error) {
    throw new Error(error);
  }
});

const unBlockUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const unblock = await User.findByIdAndUpdate(
        id,
        {
          isBlocked: false,
        },
        {
          new: true,
        }
      );
      res.json({message: "User UnBlocked", unblock});
    } catch (error) {
      throw new Error(error);
    }
  });
module.exports = {loginUserCtrl, createUser, getAllUser, getaUser,
updateUser, deleteUser, blockUser, unBlockUser };
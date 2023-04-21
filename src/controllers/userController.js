const { generateToken } = require("../config/jwtToken");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongobdId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const user = require("../models/user");
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
      const refreshToken = await generateRefreshToken(findUser?.id);
      const updateuser = await User.findByIdAndUpdate(
        findUser.id,
        {refreshToken:refreshToken},
        {new:true}
      );
        res.cookie("refreshToken",refreshToken,{
          httpOnly:true,
          maxAge: 72 *60 *60 * 1000,
        });

        res.json({
            _id: findUser?._id,
            firstname: findUser?.firstname,
            lastname: findUser?.lastname,
            email: findUser?.email,
            token: generateToken(findUser?._id),
        });
        
    }else{ throw new Error("Invalid Credentials"); }
});

//handle refresh token

const handleRefreshToken  = asyncHandler(async (req, res) =>{
  const cookie = req.cookies;
  if(!cookie?.refreshToken) throw new Error("No Refresh token in Cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({refreshToken});
  if(!user)throw new Error("No refresh token present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET,(err, decoded) =>{
    if(err|| user.id !== decoded.id){
      throw new Error("There is somethin wrong with refresh token");
    }
    const accessToken = generateToken(user?._id);
    res.json({accessToken});
  });
});
//LOGOUT

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if(!cookie?.refreshToken)throw new Error("No refresh token in Cookies");
 
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({refreshToken});
  if(!user){
    res.clearCookie("refreshToken",{
      httpOnly:true,
      secure:true,
    });
    return res.sendStatus(204); //forfbidden
  }

  await User?.findOneAndUpdate({refreshToken,
    refreshToken: "",
  });
  res.clearCookie("refreshToken",{
    httpOnly:true,
    secure:true,
  });
   res.sendStatus(204);
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
    validateMongoDbId(id);
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
    const { id } = req.params;
    validateMongoDbId(id);
    try{
        const deleteUser = await User.findByIdAndDelete(id);
        res.json({
            deleteUser,
        });
    }catch (error){
        throw new Error(error);
    }
});

const updateUser = asyncHandler( async (req, res) =>{
    
    const { _id } = req.user;
    validateMongoDbId(_id);
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
  validateMongoDbId(id);

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
    validateMongoDbId(id);
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
updateUser, deleteUser, blockUser, unBlockUser,
handleRefreshToken, logout,
 };
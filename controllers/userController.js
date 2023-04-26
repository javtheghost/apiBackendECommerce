const { generateToken } = require("../config/jwtToken");
<<<<<<< HEAD
const uniquid = require('uniquid');
const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require ("../models/coupon");
const Order = require ("../models/order");


=======
const User = require("../models/user");
>>>>>>> 182926f4fe798899898eeda8ce09d0c35d3051d9
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongobdId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("./emailController");
<<<<<<< HEAD
const { async } = require("rxjs");
=======
>>>>>>> 182926f4fe798899898eeda8ce09d0c35d3051d9
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
<<<<<<< HEAD
//LOGIN USER
=======

>>>>>>> 182926f4fe798899898eeda8ce09d0c35d3051d9
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

<<<<<<< HEAD
//LOGIN ADMINISTRADOR

const loginAdmin = asyncHandler(async (req, res) =>{
  const {email, password} = req.body;
  //checar si el usuario existe
  const findAdmin = await User.findOne({ email });
  if(findAdmin.role !== "admin") throw new Error("No Authorized");
  if(findAdmin && await findAdmin.isPasswordMatched(password)){
    const refreshToken = await generateRefreshToken(findAdmin?.id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {refreshToken:refreshToken},
      {new:true}
    );
      res.cookie("refreshToken",refreshToken,{
        httpOnly:true,
        maxAge: 72 *60 *60 * 1000,
      });

      res.json({
          _id: findAdmin?._id,
          firstname: findAdmin?.firstname,
          lastname: findAdmin?.lastname,
          email: findAdmin?.email,
          token: generateToken(findAdmin?._id),
      });
      
  }else{ throw new Error("Invalid Credentials"); }
});



=======
>>>>>>> 182926f4fe798899898eeda8ce09d0c35d3051d9
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
<<<<<<< HEAD
//UPDATE A USER
=======

>>>>>>> 182926f4fe798899898eeda8ce09d0c35d3051d9
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

<<<<<<< HEAD
const saveAddress = asyncHandler(async(req, res) =>{
  const { _id } = req.user;
  validateMongoDbId(_id);
  try{
      const updateUser = await User.findByIdAndUpdate(
    _id, 
    {
      address: req?.body.address,
    },
    {
        new: true,
    }
  );
  res.json(updateUser);
  }catch(error){throw new Error(error)}
});
=======
>>>>>>> 182926f4fe798899898eeda8ce09d0c35d3051d9
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
<<<<<<< HEAD
    res.json({message: "User Bloqued", userBlocked: blockUser});
=======
    res.json({message: "¡Usuario bloqueado!",blockUser});
>>>>>>> 182926f4fe798899898eeda8ce09d0c35d3051d9
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
  
  const updatePassword = asyncHandler(async(req, res) =>{
    const { _id } = req.user;
    const { password } = req.body;
    validateMongoDbId(_id);
      const user = await User.findById(_id);
      if (password) {
        user.password = password;
        user.passwordChangedAt = new Date();
        await user.createPasswordResetToken();
        const updatedUser = await user.save();
        res.json(updatedUser);
      }else {
        res.json(user);
      }
    
  });

  const forgotPasswordToken = asyncHandler(async(req, res) =>{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) throw new Error("User not found with this email");
    try{
      const token = await user.createPasswordResetToken();
      await user.save();
      const resetURL = `Hola, restablece tu contraseña en el enlace siguiente. \n Este enlace solo está disponible durante 10 minutos.
      <a href='http://localhost/9000/api/user/reset-password/${token}'>Da click aquí</a>`;

      const data = {
        to: email,
        text: "Heeey, que tal?",
        subject: "Restablecer Contraseña",
        html: resetURL,
      };
      sendEmail(data);
      res.json(token);
    }catch(error){
      throw new Error(error)
    }
  });


  const resetPassword = asyncHandler(async(req, res)=>{
    const {password} = req.body;
    const {token} =req.params;
    const hashedToken = crypto.createHash('sha256').update(token).digest("hex");

    const user = await User.findOne(
      {
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now()},
      
    });

    if(!user) throw new Error("Token Expired, Please try again later");
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    res.json(user);

  });
<<<<<<< HEAD


  const getWishlist = asyncHandler(async(req, res)=>{
    const {_id} = req.params;
    try{
      const findUser = await User.findById(_id).populate('wishlist');
      res.json(findUser);

    }catch(error){
      throw new Error(error)
    }
  });

  const userCart = asyncHandler(async (req, res)=>{
    const {cart} = req.body;
    const {_id} = req.user;
    validateMongoDbId(_id);
    try{
      let products = [];
      const user = await User.findById(_id);
    //check if user already have product in cart
      
      const alreadyExistCart = await Cart.findOne({orderBy: user._id});
      if(alreadyExistCart){
        alreadyExistCart.remove();
      }

      for(let i = 0; i< cart.length; i++){
        let object = {};
        object.product = cart[i]._id;
        object.count = cart[i].count;
        object.color = cart[i].color;

        let getPrice =  await Product.findById(cart[i]._id).select("price").exec();
        object.price = getPrice;
         // Convertir el precio a número //evitar errores
        object.price = Number(object.price.price);
        
        products.push(object);

      }
      let cartTotal = 0;
      for (let i = 0; i < products.length; i++) {
        if (!isNaN(products[i].price)) { // verificar que el precio sea un número válido
          cartTotal += products[i].price * products[i].count;
        }
      }

      let newCart = await new Cart({
        products,
        cartTotal,
        orderBy: user?._id,
      }).save();
      res.json(newCart);
      
    }catch(error){
      throw new Error(error)
    }
  });

  const getUserCart = asyncHandler(async(req, res) =>{
    const {_id} = req.user;
    validateMongoDbId(_id);
    try{
      const cart = await Cart.findOne({orderBy: _id}).populate(
        "products.product"
      );
      res.json(cart);
    }catch(error){throw new Error(error);}
  }); 

  const emptyCart = asyncHandler(async(req, res) =>{
    const {_id} = req.user;
    validateMongoDbId(_id);
    try{
      const user = await User.findOne({_id});
      const cart = await Cart.findOneAndRemove({orderBy: user._id})

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }
      res.json({ 
        message: "El carrito ha sido vaciado correctamente",
        cart: cart
      });
    }catch(error){throw new Error(error);}
  }); 

  const applyCoupon = asyncHandler(async (req, res) => {
    const { coupon } = req.body;
    const { _id } = req.user;
    validateMongoDbId(_id);
    const validCoupon = await Coupon.findOne({
      name: { $regex: new RegExp(coupon, "i") }
    });

    const user = await User.findOne({ _id });

    let {cartTotal} = await Cart.findOne({
      orderBy: user._id,
    }).populate("products.product");
    let totalAfterDiscount = (
      cartTotal -
       (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);
    await Cart.findOneAndUpdate(
      {orderBy: user._id},
      {totalAfterDiscount},
      {orderBy: true},
    );
    res.json(totalAfterDiscount)
  });

  const createOrder = asyncHandler(async (req, res) =>{
    const {COD, couponApplied} = req.body;
    const {_id} = req.user;
    validateMongoDbId(_id);

    try{
      if(!COD) throw new Error("Create cash order failed");
      const user = await User.findById(_id);
      let userCart = await Cart.findOne({orderBy:user._id});
      let finalAmount = 0;
      if(couponApplied && userCart.totalAfterDiscount){
        finalAmount = userCart.totalAfterDiscount;
      }else{finalAmount = userCart.cartTotal}
      console.log("Final amount: ", finalAmount);
      let newOrder = await new Order({
        products: userCart.products,
        paymentIntent:{
          id: uniquid(),
          method: "COD",
          amount: finalAmount,
          status: "Cash on Delivery",
          created: Date.now(),
          currency: "mxn",
        },
        orderBy: user._id,
        orderStatus:"Cash on Delivery",

      }).save();
 
      let update = userCart.products.map((item) =>{
        return{
          updateOne: {
            filter: {_id: item.product._id},
            update:{$inc: {quantity: - item.count, sold: + item.count}},
          },
        };
      });
      const updated = await Product.bulkWrite(update, {});
      res.json({message:"success"})

    }catch(error){
      throw new Error(error)
    }
  });

  const getOrders = asyncHandler(async(req, res)=>{
    const {_id} = req.user;
    validateMongoDbId(_id);
    try{
      const userorders = await Order.findOne({orderBy: _id})
        .populate("products.product")
        .exec();
      res.json(userorders);
      console.log(userorders)
    }catch(error){throw new Error(error);}
  });

  const updateOrderStatus = asyncHandler(async(req, res)=>{
    const {status} = req.body;
    const {id} = req.params;
    validateMongoDbId(id);
    try{
      const findOrder = await Order.findByIdAndUpdate(
        id,
        {
          orderStatus: status,
          paymentIntent:{
            status: status,
          },
        },
        {new:true}
      );
      res.json({message:"Updated Status Succesfull", order: findOrder});
    }catch(error){throw new Error(error);}
  });
module.exports = {
loginUserCtrl,
createUser, 
getAllUser, 
getaUser,
updateUser, 
deleteUser, 
blockUser, unBlockUser,
handleRefreshToken, logout, 
updatePassword,forgotPasswordToken,
resetPassword, loginAdmin,
getWishlist,
saveAddress,
userCart,
getUserCart,
emptyCart,
applyCoupon,
createOrder,
getOrders,
updateOrderStatus
};
=======
module.exports = {loginUserCtrl, createUser, getAllUser, getaUser,
updateUser, deleteUser, blockUser, unBlockUser,
handleRefreshToken, logout, updatePassword, forgotPasswordToken, resetPassword
 };
>>>>>>> 182926f4fe798899898eeda8ce09d0c35d3051d9

const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique:true,
      lowercase:true,
    },
    description: {
      type: String,
      required: true,
      unique: false,
    },
    images:[],
    price: {
      type: Number,
      required: true,
    },
    quantity:{
      type: Number,
      required: true,
    },
    sold:{
      type:Number,
      default:0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    brand:{
      type:String,
      required:true,
    },
    tags:[],
    color:[],
    ratings:[
        {
            star:Number,
            comment:String,
            postedby:{type: mongoose.Schema.Types.ObjectId, ref:"User"}
        }
    ],
    totalrating:{
      type:String,
      default: 0,
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model('Product', productSchema);

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
    images:{
        type:Array,
    },
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
    color:{
        type:String,
        required:true,
    },
    ratings:[
        {
            star:Number,
            postedby:{type: mongoose.Schema.Types.ObjectId, ref:"User"}
        }
    ]
  },
  { timestamps: true }
);
module.exports = mongoose.model('Product', productSchema);

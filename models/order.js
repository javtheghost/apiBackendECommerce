const mongoose = require("mongoose"); // Erase if already required

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStatus:{
        type: String,
        default: "Not Processed",
        enum:[
            "Not Proccessed",
            "Cash on Delivery",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Delivered",

        ],
    },
    orderBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

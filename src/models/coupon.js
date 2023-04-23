const mongoose = require('mongoose'); // Erase if already required

const couponSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
      },
      expiry:{

      },
      discount:{
        type: Number,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model('Coupon', couponSchema);
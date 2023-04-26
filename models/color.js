const mongoose = require('mongoose'); // Erase if already required

const colorSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model('Color', colorSchema);
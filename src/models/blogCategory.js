const mongoose = require('mongoose'); // Erase if already required

const blogCategorySchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
    },
    { timestamps: true } // añadido timestamps aquí
  );
  
  //Export the model
  module.exports = mongoose.model('blogCategory', blogCategorySchema);
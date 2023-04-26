<<<<<<< HEAD
require("dotenv").config();
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:  process.env.CLOUDINARY_API_KEY,
  api_secret:  process.env.CLOUDINARY_API_SECRET
});
=======
const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dcfpgkmj4",
  api_key: "285137389114157",
  api_secret: "M7RZbGaE50M9nrxeqw9VwnWaq44"
});

>>>>>>> 182926f4fe798899898eeda8ce09d0c35d3051d9
const cloudinaryUploadImg = async (fileToUpload) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUpload, (result) => {
      resolve(
        {
          url: result.secure_url,
<<<<<<< HEAD
          asset_id: result.asset_id,
          public_id: result.public_id,
=======
>>>>>>> 182926f4fe798899898eeda8ce09d0c35d3051d9
        },
        {
          resource_type: "auto",
        },
        {
          folder:"images",
        }
      );
    });
  });
};
<<<<<<< HEAD

const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(fileToDelete, (result) => {
      resolve(
        {
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        },
        {
          resource_type: "auto",
        },
        {
          folder:"images",
        }
      );
    });
  });
};
module.exports = {cloudinaryUploadImg, cloudinaryDeleteImg};
=======
module.exports = cloudinaryUploadImg;
>>>>>>> 182926f4fe798899898eeda8ce09d0c35d3051d9

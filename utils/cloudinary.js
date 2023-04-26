const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "dcfpgkmj4",
  api_key: "285137389114157",
  api_secret: "M7RZbGaE50M9nrxeqw9VwnWaq44"
});

const cloudinaryUploadImg = async (fileToUpload) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(fileToUpload, (result) => {
      resolve(
        {
          url: result.secure_url,
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
module.exports = cloudinaryUploadImg;
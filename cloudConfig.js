<<<<<<< HEAD
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Wanderlust_DEV',
    allowedFormat: ["png","jpg","jpeg"],// supports promises as well
  },
});

module.exports = {
    cloudinary,
    storage
=======
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Wanderlust_DEV',
    allowedFormat: ["png","jpg","jpeg"],// supports promises as well
  },
});

module.exports = {
    cloudinary,
    storage
>>>>>>> 73859dbc517a6651d4ba007b0089f8536e5da0d4
}
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dmmyupmtm',
  api_key: '764581329827321',
  api_secret: 'HCJt0o1rYbmAzqkOD2VQRUCipwI'
});

module.exports = cloudinary;
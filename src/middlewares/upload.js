const multer = require("multer");
const SharpMulter = require("sharp-multer");
const path = require("path");

const storage = SharpMulter({
  destination: (req, file, callback) => callback(null, "/home/ubuntu/BackEnd_RentDocs/uploads"),
  imageOptions: {
    fileFormat: "jpg",
    quality: 100,
    resize: { width: 500, height: 500 },
  },
  filename: (req, file) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.jpg`;
    return uniqueName;
  },
});

const upload = multer({ storage });

module.exports = upload;

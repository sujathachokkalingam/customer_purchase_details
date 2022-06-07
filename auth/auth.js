const multer = require("multer");
const controller=require("../controller/productcontroller.js")

const csvFilter = (req, file, cb) => {
  if (file.mimetype.includes("csv")) {
    cb(null, true);
  } else {
    cb("Please upload only csv file.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, `${Date.now()}-sujatha-${file.originalname}`);
  },
  
});

var upload = multer({ storage: storage, fileFilter: csvFilter});

module.exports = upload;


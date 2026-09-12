const multer = require("multer");
const { getUploadDir } = require("./untils/uploadDir");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, getUploadDir("uploads"));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = file.originalname.split(".").pop();
        cb(null, uniqueSuffix + "." + ext);
    },
});

exports.upload = multer({ storage });

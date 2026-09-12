const ErrorHandler = require("../untils/ErrorHandler");
const { applyCors } = require("../untils/origins");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong Mongoose Object ID Error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }
    // Send error response
   if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
   }

   // Wrong JWT Error
   if (err.name === "JsonWebTokenError") {
        const message = `your url is invalid, try again`;
        err = new ErrorHandler(message, 400);
   }

   // JWT Expire Error
   if (err.name === "TokenExpiredError") {
        const message = `your url is expired, try again`;
        err = new ErrorHandler(message, 400);
   }

   applyCors(req, res);

   res.status(err.statusCode).json({
        success: false,
        message: err.message,
   });
}
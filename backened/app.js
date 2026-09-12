const cloudinary = require("cloudinary");

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const express = require("express");
const cors = require("cors");
const app = express();
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

// Local uploads
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Backend health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce Backend is Running Successfully!",
  });
});

// Routes
const userRoutes = require("./routes/userRoute");
const shopRoutes = require("./routes/shop");
const product = require("./controllers/product");
const event = require("./controllers/event");
const coupon = require("./controllers/couponCode");
const order = require("./controllers/order");
const payment = require("./controllers/payment");
const conversation = require("./controllers/conversation");
const message = require("./controllers/message");
const withdraw = require("./controllers/withdraw");

app.use("/api/v2/shop", shopRoutes);
app.use("/api/v2/user", userRoutes);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/order", order);
app.use("/api/v2/payment", payment);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/withdraw", withdraw);

// Error Handler
app.use(errorHandler);

module.exports = app;
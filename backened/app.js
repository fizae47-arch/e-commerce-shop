const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const cloudinary = require("cloudinary");
const { corsOptions } = require("./untils/origins");
const errorHandler = require("./middleware/error");

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.set("trust proxy", 1);

app.use(cors(corsOptions()));
app.options(/.*/, cors(corsOptions()));

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "E-Commerce Backend is Running Successfully!",
  });
});

app.get("/api/v2/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is healthy",
  });
});

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

app.use(errorHandler);

module.exports = app;

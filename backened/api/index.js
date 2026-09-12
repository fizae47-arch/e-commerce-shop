const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../config/.env"),
});

const app = require("../app");
const connectDatabase = require("../db/Database");
const { applyCors } = require("../untils/origins");

module.exports = async (req, res) => {
  try {
    await connectDatabase();
    return app(req, res);
  } catch (error) {
    applyCors(req, res);

    if (req.method === "OPTIONS") {
      return res.status(204).end();
    }

    console.error("Serverless handler error:", error.message);

    if (res.headersSent) {
      return;
    }

    res.status(500).json({
      success: false,
      message: "Backend failed to handle this request",
    });
  }
};

const path = require("path");

// Load environment variables
require("dotenv").config({
  path: path.resolve(__dirname, "./config/.env")
});

const app = require("../app");
const connectDatabase = require("../db/Database");

// Connect to database
connectDatabase();

module.exports = app;
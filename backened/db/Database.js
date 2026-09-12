const mongoose = require("mongoose");

const globalCache = global.__mongooseCache || { conn: null, promise: null };
global.__mongooseCache = globalCache;

const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!process.env.DB_URL) {
    throw new Error("DB_URL is not defined");
  }

  if (!globalCache.promise) {
    globalCache.promise = mongoose
      .connect(process.env.DB_URL, {
        bufferCommands: false,
      })
      .then((instance) => {
        console.log(
          `MongoDB connected with server: ${instance.connection.host}`
        );
        return instance.connection;
      })
      .catch((err) => {
        globalCache.promise = null;
        throw err;
      });
  }

  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
};

module.exports = connectDatabase;

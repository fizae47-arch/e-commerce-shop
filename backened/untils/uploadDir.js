const path = require("path");
const os = require("os");

function getUploadDir(subdir) {
  if (process.env.VERCEL) {
    return os.tmpdir();
  }

  return path.join(__dirname, subdir);
}

module.exports = { getUploadDir };

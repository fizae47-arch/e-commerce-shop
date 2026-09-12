const express = require("express");
const router = express.Router();
const {
    registerUser,
    activateAccount,
    loginUser,
    logoutUser,
    getUserDetails,
    updatePassword,
    updateProfile,
    updateAvatar,
    updateUserInfo,
    updateUserAddress,
    deleteUserAddress,
    getAllUsers,
    getUserInfo,
} = require("../controllers/userController");
const multer = require("multer");
const { isAuthenticatedUser } = require("../middleware/auth");
const { getUploadDir } = require("../untils/uploadDir");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, getUploadDir("uploads"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const ext = file.originalname.split(".").pop();
        cb(null, uniqueSuffix + "." + ext);
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Routes
router.post("/register", upload.single("profilePhoto"), registerUser);
router.post("/activation", activateAccount);
router.post("/login-user", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser", isAuthenticatedUser, getUserDetails);
router.get("/user-info/:id", getUserInfo);
router.put("/password/update", isAuthenticatedUser, updatePassword);
router.put("/me/update", isAuthenticatedUser, updateProfile);
router.put(
    "/update-avatar",
    isAuthenticatedUser,
    upload.single("profilePhoto"),
    updateAvatar
);
router.put("/update-user-info", isAuthenticatedUser, updateUserInfo);
router.put("/update-user-addresses", isAuthenticatedUser, updateUserAddress);
router.delete("/delete-user-address/:id", isAuthenticatedUser, deleteUserAddress);
router.get("/admin-all-users", isAuthenticatedUser, getAllUsers);
router.put("/update-user-password", isAuthenticatedUser, updatePassword);

module.exports = router;
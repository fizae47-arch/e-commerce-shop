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
const { upload } = require("../multer");
const { isAuthenticatedUser } = require("../middleware/auth");

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
const User = require("../models/userModel");
const ErrorHandler = require("../untils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendEmail = require("../untils/sendMail");
const sendToken = require("../untils/jwtToken");
const { isAuthenticatedUser } = require("../middleware/auth");
const path = require("path");
const { getFrontendUrl, getBackendUrl } = require("../untils/origins");

// -----------------------------
// Helper: Activation Token
// -----------------------------
function createActivationToken(user) {
    return jwt.sign(
        { id: user._id },   // ✅ only sign the user ID
        process.env.ACTIVATION_SECRET,
        { expiresIn: "7d" }
    );
}

// -----------------------------
// Register User
// -----------------------------
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    // console.log("BODY:", req.body);
    // console.log("FILE:", req.file);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHandler("All fields required", 400));
    }

    if (!req.file) {
        return next(new ErrorHandler("Please upload a profile photo", 400));
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(new ErrorHandler("User already exists", 400));
    }

    const fileUrl = `${getBackendUrl(req)}/uploads/${req.file.filename}`;

    const user = await User.create({
        name,
        email,
        password,
        avatar: fileUrl,
        isActivated: false,
    });

    const activationToken = createActivationToken(user);
    const activationUrl = `${getFrontendUrl()}/activation/${activationToken}`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Activate your account",
            message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
        });

        res.status(201).json({
            success: true,
            message: `Please check your email (${user.email}) to activate your account!`,
        });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
});

// -----------------------------
// Activate Account
// -----------------------------
exports.activateAccount = catchAsyncErrors(async (req, res, next) => {
    const { activationToken } = req.body;

    // Decode token to get user ID
    const decoded = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

    // Find user by ID
    const user = await User.findById(decoded.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Mark as activated
   user.isActivated = true;
    await user.save();

    sendToken(user, 200, res);
});

// -----------------------------
// Login User
// -----------------------------
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email & password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    sendToken(user, 200, res);
});

// -----------------------------
// Get User Details
// -----------------------------
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// -----------------------------
// Logout User
// -----------------------------
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "none",
        secure: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});

// -----------------------------
// Update Password
// -----------------------------
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = await user.comparePassword(oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    user.password = newPassword;
    await user.save();

    const token = user.getJWTToken();

    res.status(200).json({
        success: true,
        token,
    });
});

// -----------------------------
// Update User Profile
// -----------------------------
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        user,
    });
});

// -----------------------------
// Update Avatar
// -----------------------------
exports.updateAvatar = catchAsyncErrors(async (req, res, next) => {
    if (!req.file) {
        return next(new ErrorHandler("Please upload an image", 400));
    }

    const user = await User.findById(req.user.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // ✅ purani avatar file delete karo (agar local uploads folder me hai)
    if (user.avatar) {
        const oldFilename = user.avatar.split("/uploads/")[1];
        if (oldFilename) {
            const fs = require("fs");
            const oldFilePath = path.join(__dirname, "..", "uploads", oldFilename);
            fs.unlink(oldFilePath, (err) => {
                if (err) console.log("Old avatar delete failed:", err.message);
            });
        }
    }

    const fileUrl = `${getBackendUrl(req)}/uploads/${req.file.filename}`;

    user.avatar = fileUrl;
    await user.save();

    res.status(200).json({
        success: true,
        user,
    });
});

// -----------------------------
// Update User Info (name, email, phoneNumber) — password se verify karke
// -----------------------------
exports.updateUserInfo = catchAsyncErrors(async (req, res, next) => {
    const { email, password, phoneNumber, name } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Incorrect password!", 400));
    }

    user.name = name;
    user.email = email;
    user.phoneNumber = phoneNumber;

    await user.save();

    res.status(201).json({
        success: true,
        user,
    });
});

// -----------------------------
// Add / Update User Address
// -----------------------------
exports.updateUserAddress = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
    );

    if (sameTypeAddress) {
        return next(
            new ErrorHandler(`${req.body.addressType} address already exists`, 400)
        );
    }

    const existsAddress = user.addresses.find(
        (address) => address._id === req.body._id
    );

    if (existsAddress) {
        Object.assign(existsAddress, req.body);
    } else {
        // add new address
        user.addresses.push(req.body);
    }

    await user.save();

    res.status(200).json({
        success: true,
        user,
    });
});

// -----------------------------
// Delete User Address
// -----------------------------
exports.deleteUserAddress = catchAsyncErrors(async (req, res, next) => {
    const userId = req.user._id;
    const addressId = req.params.id;

    await User.updateOne(
        { _id: userId },
        { $pull: { addresses: { _id: addressId } } }
    );

    const user = await User.findById(userId);

    res.status(200).json({
        success: true,
        user,
    });
});

// -----------------------------
// Get all users --- admin
// -----------------------------
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find().sort({ createdAt: -1 });

    res.status(200).json({
        success: true,
        users,
    });
});

// -----------------------------
// Get single user info by ID (public — used for chat/messages)
// -----------------------------
exports.getUserInfo = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    res.status(200).json({
        success: true,
        user,
    });
});
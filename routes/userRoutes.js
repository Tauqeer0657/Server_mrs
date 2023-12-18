// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
router.use(express.static("public"));

// for saving image using registration form

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/userImages"));
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

// Registration
router.post("/register", upload.single("image"), userController.registerUser);
router.get("/registrations", userController.getAllRegistrations);

// Login
router.post("/login", userController.loginUser);

// Logout from single device
router.get("/logout", auth, userController.logoutUser);

// Logout from all devices
router.get("/logout/all", auth, userController.logoutAllDevices);

module.exports = router;

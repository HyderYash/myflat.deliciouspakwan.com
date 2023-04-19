const express = require("express");
const {
  registerUser,
  userLogin,
  getAllCategories,
  addCategories,
  addUtilities,
  getAllUtilities,
  getReports,
} = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

// // Router Level Middleware - To Protect Route
// router.use("/", protect);

// Public Routes
router.post("/register", registerUser);
router.post("/login", userLogin);

// Private/Protected Routes
router.get("/getallcategories", protect, getAllCategories);
router.get("/getallutlities", protect, getAllUtilities);
router.post("/addCategories", protect, addCategories);
router.post("/addUtilities", protect, addUtilities);
router.post("/getreports", getReports);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  getCategories, // Updated function name
  createCategory, // Updated function name
  getCategoryById, // Updated function name
  updateCategory, // Updated function name
  deleteCategory, // Updated function name
} = require("../controllers/categoryController"); // Updated controller import

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get("/categories", getCategories); // Updated route
router.get(
  "/admin/categories",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getCategories
);

router.post("/category/new", isAuthenticatedUser, createCategory); // Updated route
router.get("/category/:id", getCategoryById); // Updated route
router
  .route("/admin/category/:id") // Updated route
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateCategory)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteCategory);

module.exports = router;

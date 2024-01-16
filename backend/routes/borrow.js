const express = require("express");
const router = express.Router();

const {
  getBorrows, // Change function names
  createBorrow,
  getBorrowById,
  updateBorrow,
  deleteBorrow,
  myBorrows,
} = require("../controllers/borrowController"); // Change controller import

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get("/borrows", getBorrows); // Change route names

router.get(
  "/admin/borrows",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getBorrows
);

router.get("/borrows/me", isAuthenticatedUser, myBorrows);

router.post("/borrow/new", isAuthenticatedUser, createBorrow); // Change route name
router.get("/borrow/:id", getBorrowById); // Change route name
router
  .route("/admin/borrow/:id") // Change route name
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateBorrow)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteBorrow);

module.exports = router;

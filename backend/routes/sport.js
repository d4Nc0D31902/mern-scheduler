const express = require("express");
const router = express.Router();

const {
  getSports,
  createSport,
  getSportById,
  updateSport,
  deleteSport,
  deactivateSport,
  reactivateSport,
} = require("../controllers/sportController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get("/sports", getSports);

router.get(
  "/admin/sports",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSports
);

router.post("/sport/new", isAuthenticatedUser, createSport);
router.get("/sport/:id", getSportById);
router
  .route("/admin/sport/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateSport)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteSport);

router.put(
  "/admin/sport/deactivate/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deactivateSport
);

router.put(
  "/admin/sport/reactivate/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  reactivateSport
);

module.exports = router;

// routes/equipment.js

const express = require("express");
const router = express.Router();

const {
  getEquipment,
  createEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
  deactivateEquipment,
  reactivateEquipment,
} = require("../controllers/equipmentController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get("/equipments", getEquipment);

router.get(
  "/admin/equipments",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getEquipment
);

router.post("/equipment/new", isAuthenticatedUser, createEquipment);
router.get("/equipment/:id", getEquipmentById);
router
  .route("/admin/equipment/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateEquipment)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteEquipment);

router.put(
  "/admin/equipment/deactivate/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deactivateEquipment
);

router.put(
  "/admin/equipment/reactivate/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  reactivateEquipment
);

module.exports = router;

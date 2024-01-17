const express = require("express");
const router = express.Router();

const {
  getEquipment,
  createEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
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

module.exports = router;

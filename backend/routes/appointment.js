const express = require("express");
const router = express.Router();

const {
  getAppointments,
  createAppointment,
  getAppointmentById,
  getSingleAppointment,
  updateAppointment,
  deleteAppointment,
  myAppointments,
  joinAppointment, // Add this line to import the joinAppointment function
} = require("../controllers/appointmentController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get("/appointments", getAppointments);

router.get(
  "/admin/appointments",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getAppointments
);

router.get("/appointments/me", isAuthenticatedUser, myAppointments);

router.post("/appointment/new", isAuthenticatedUser, createAppointment);
router.get("/appointment/:id", getSingleAppointment);
router.post("/appointment/join/:id", isAuthenticatedUser, joinAppointment); // Add this line for the join route
router.get("/admin/appointment/:id", isAuthenticatedUser, getAppointmentById);
router
  .route("/admin/appointment/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateAppointment)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteAppointment);

module.exports = router;

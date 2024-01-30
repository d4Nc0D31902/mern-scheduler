const express = require("express");
const router = express.Router();

const {
  getLocations,
  createLocation,
  getLocationById,
  updateLocation,
  deleteLocation,
  deactivateLocation,
  reactivateLocation,
} = require("../controllers/locationController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.get("/locations", getLocations);

router.get(
  "/admin/locations",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getLocations
);

router.post("/location/new", isAuthenticatedUser, createLocation);
router.get("/location/:id", getLocationById);
router
  .route("/admin/location/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateLocation)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteLocation);

router.put(
  "/admin/location/deactivate/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deactivateLocation
);

router.put(
  "/admin/location/reactivate/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  reactivateLocation
);

module.exports = router;

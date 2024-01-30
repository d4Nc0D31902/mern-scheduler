const Location = require("../models/location");
const ErrorHandler = require("../utils/errorHandler");

// @desc    Create a new location
// @route   POST /api/locations
// @access  Private (You can define your own authentication middleware)

exports.createLocation = async (req, res, next) => {
  try {
    const { name } = req.body;

    // Create a new instance of the Location model
    const newLocation = await Location.create({
      name,
    });

    res.status(201).json({
      success: true,
      newLocation,
    });
  } catch (error) {
    console.error(error); // Log the error
    next(new ErrorHandler("Location creation failed", 500));
  }
};

// @desc    Get all locations
// @route   GET /api/locations
// @access  Public (you can define your own access control)

exports.getLocations = async (req, res, next) => {
  try {
    const locations = await Location.find();
    res.status(200).json({
      success: true,
      locations,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to retrieve locations", 500));
  }
};

// @desc    Get a single location by ID
// @route   GET /api/locations/:id
// @access  Public (you can define your own access control)

exports.getLocationById = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return next(new ErrorHandler("Location not found", 404));
    }

    res.status(200).json({
      success: true,
      location,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to retrieve the location", 500));
  }
};

// @desc    Update a location by ID
// @route   PUT /api/locations/:id
// @access  Private (You can define your own authentication middleware)

exports.updateLocation = async (req, res, next) => {
  try {
    const { name } = req.body;
    const location = await Location.findById(req.params.id);

    if (!location) {
      return next(new ErrorHandler("Location not found", 404));
    }

    // Update location properties
    location.name = name;

    const updatedLocation = await location.save();

    res.status(200).json({
      success: true,
      location: updatedLocation,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to update the location", 500));
  }
};

// @desc    Delete a location by ID
// @route   DELETE /api/locations/:id
// @access  Private (You can define your own access control)

exports.deleteLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return next(new ErrorHandler("Location not found", 404));
    }

    await location.remove();
    res.status(200).json({
      success: true,
      message: "Location deleted",
    });
  } catch (error) {
    next(new ErrorHandler("Failed to delete the location", 500));
  }
};

// @desc    Deactivate a location by ID
// @route   PUT /api/locations/deactivate/:id
// @access  Private (You can define your own authentication middleware)

exports.deactivateLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return next(new ErrorHandler("Location not found", 404));
    }

    location.status = "inactive";

    const deactivatedLocation = await location.save();

    res.status(200).json({
      success: true,
      location: deactivatedLocation,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to deactivate the location", 500));
  }
};

// @desc    Reactivate a location by ID
// @route   PUT /api/locations/reactivate/:id
// @access  Private (You can define your own authentication middleware)

exports.reactivateLocation = async (req, res, next) => {
  try {
    const location = await Location.findById(req.params.id);

    if (!location) {
      return next(new ErrorHandler("Location not found", 404));
    }

    location.status = "active";

    const reactivatedLocation = await location.save();

    res.status(200).json({
      success: true,
      location: reactivatedLocation,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to reactivate the location", 500));
  }
};

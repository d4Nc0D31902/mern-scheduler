const Equipment = require("../models/equipment");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");

// @desc    Create new equipment
// @route   POST /api/equipment
// @access  Private

exports.createEquipment = async (req, res, next) => {
  let images = Array.isArray(req.body.images)
    ? req.body.images
    : [req.body.images];

  images = images.map((image) => {
    if (typeof image === "string") {
      return image;
    } else {
      // Handle invalid image format (optional)
      return null;
    }
  });

  // Remove any null values from the array
  images = images.filter((image) => image !== null);

  if (images.length === 0) {
    return res.status(400).json({
      success: false,
      error: "Images array is empty",
    });
  }

  let imagesLinks = [];

  try {
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "equipment",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    const equipment = await Equipment.create({
      name: req.body.name,
      description: req.body.description,
      sport: req.body.sport,
      stock: req.body.stock,
      images: imagesLinks,
    });

    res.status(201).json({
      success: true,
      equipment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
    });
  }
};

// @desc    Get all equipment
// @route   GET /api/equipment
// @access  Public (you can define your own access control)

exports.getEquipment = async (req, res, next) => {
  try {
    const equipmentList = await Equipment.find();
    res.status(200).json({
      success: true,
      equipmentList,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to retrieve equipment", 500));
  }
};

// @desc    Get a single equipment by ID
// @route   GET /api/equipment/:id
// @access  Public (you can define your own access control)

exports.getEquipmentById = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return next(new ErrorHandler("Equipment not found", 404));
    }

    res.status(200).json({
      success: true,
      equipment,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to retrieve the equipment", 500));
  }
};

// @desc    Update equipment by ID
// @route   PUT /api/equipment/:id
// @access  Private (Admin only)

exports.updateEquipment = async (req, res, next) => {
  let equipment = await Equipment.findById(req.params.id);

  if (!equipment) {
    return next(new ErrorHandler("Equipment not found", 404));
  }

  let images = req.body.images; // Get images from the request body

  if (images) {
    // Check if images is defined
    if (typeof images === "string") {
      images = [images]; // Convert to an array if it's a string
    }

    // Deleting images associated with the equipment
    for (let i = 0; i < equipment.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        equipment.images[i].public_id
      );
    }

    let imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "equipment",
      });
      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    req.body.images = imagesLinks;
  }

  equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(200).json({
    success: true,
    equipment,
  });
};

// @desc    Delete equipment by ID
// @route   DELETE /api/equipment/:id
// @access  Private (Admin only)

exports.deleteEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return next(new ErrorHandler("Equipment not found", 404));
    }

    // Check if the user is an admin
    if (req.user.role !== "admin") {
      return next(
        new ErrorHandler("Unauthorized. Only admins can delete equipment.", 403)
      );
    }

    await equipment.remove();
    res.status(200).json({
      success: true,
      message: "Equipment deleted",
    });
  } catch (error) {
    next(new ErrorHandler("Failed to delete the equipment", 500));
  }
};


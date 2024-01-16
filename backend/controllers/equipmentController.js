const Equipment = require("../models/equipment");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/user");
const cloudinary = require("cloudinary");

// @desc    Create a new equipment
// @route   POST /api/equipments
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
        folder: "equipments",
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

// @desc    Get all equipments
// @route   GET /api/equipments
// @access  Public (you can define your own access control)

exports.getEquipments = async (req, res, next) => {
  try {
    const equipments = await Equipment.find();
    res.status(200).json({
      success: true,
      equipments,
    });
  } catch (error) {
    console.error("Error retrieving equipments:", error);
    res.status(500).json({
      success: false,
      error: {
        statusCode: 500,
      },
      message: "Failed to retrieve equipments",
    });
  }
};

// @desc    Get a single equipment by ID
// @route   GET /api/equipments/:id
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

// @desc    Update an equipment by ID
// @route   PUT /api/equipments/:id
// @access  Private (Admin only)

exports.updateEquipment = async (req, res, next) => {
  try {
    let equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return next(new ErrorHandler("Equipment not found", 404));
    }

    let images = req.body.images;

    if (images && images.length > 0) {
      // Delete existing images associated with the equipment
      for (let i = 0; i < equipment.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
          String(equipment.images[i].public_id)
        );
        console.log(result); // Add this line for debugging
      }

      // Upload new images
      let imagesLinks = await Promise.all(
        images.map(async (image) => {
          const result = await cloudinary.v2.uploader.upload(image, {
            folder: "equipments",
          });
          return {
            public_id: result.public_id,
            url: result.secure_url,
          };
        })
      );

      // Update new images in the request body
      req.body.images = imagesLinks;
    } else {
      // If no new images provided, retain existing ones
      req.body.images = equipment.images;
    }

    // Update the equipment
    equipment = await Equipment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    return res.status(200).json({
      success: true,
      equipment,
    });
  } catch (error) {
    console.error("Error updating equipment:", error);
    next(
      new ErrorHandler(`Failed to update the equipment: ${error.message}`, 500)
    );
  }
};

// @desc    Delete an equipment by ID
// @route   DELETE /api/equipments/:id
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
        new ErrorHandler(
          "Unauthorized. Only admins can delete equipments.",
          403
        )
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

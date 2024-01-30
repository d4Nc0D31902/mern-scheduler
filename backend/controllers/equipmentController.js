const Equipment = require("../models/equipment");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");

exports.createEquipment = async (req, res, next) => {
  let images = Array.isArray(req.body.images)
    ? req.body.images
    : [req.body.images];

  images = images.map((image) => {
    if (typeof image === "string") {
      return image;
    } else {
      return null;
    }
  });

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

exports.updateEquipment = async (req, res, next) => {
  let equipment = await Equipment.findById(req.params.id);

  if (!equipment) {
    return next(new ErrorHandler("Equipment not found", 404));
  }

  let images = req.body.images;

  if (images) {
    if (typeof images === "string") {
      images = [images];
    }

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

  if (req.body.status) {
    equipment.status = req.body.status;
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

exports.deleteEquipment = async (req, res, next) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return next(new ErrorHandler("Equipment not found", 404));
    }

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

exports.deactivateEquipment = async (req, res, next) => {
  try {
    let equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return next(new ErrorHandler("Equipment not found", 404));
    }

    equipment.status = "inactive";

    await equipment.save();

    res.status(200).json({
      success: true,
      message: "Equipment deactivated",
    });
  } catch (error) {
    next(new ErrorHandler("Failed to deactivate the equipment", 500));
  }
};

exports.reactivateEquipment = async (req, res, next) => {
  try {
    let equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return next(new ErrorHandler("Equipment not found", 404));
    }

    equipment.status = "active";

    await equipment.save();

    res.status(200).json({
      success: true,
      message: "Equipment reactivated",
    });
  } catch (error) {
    next(new ErrorHandler("Failed to reactivate the equipment", 500));
  }
};

const Borrow = require("../models/borrowing");
const Equipment = require("../models/equipment");
const ErrorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");

exports.createBorrow = async (req, res, next) => {
  try {
    const {
      equipment,
      quantity,
      reason_borrow,
      date_borrow,
      date_return,
      issue,
      status,
      reason_status,
    } = req.body;

    // Create a new instance of the Borrow model
    const newBorrow = await Borrow.create({
      userId: req.user._id, // Assuming you have user information in the request
      user: req.user.name,
      equipment,
      quantity,
      reason_borrow,
      date_borrow,
      date_return,
      issue,
      status,
      reason_status,
    });

    // Fetch the equipment details
    const equipmentDetails = await Equipment.findOne({ name: equipment });

    if (!equipmentDetails) {
      return next(new ErrorHandler("Equipment not found", 404));
    }

    // Deduct the borrowed quantity from the equipment stock
    equipmentDetails.stock -= quantity;

    // Save the updated equipment details
    await equipmentDetails.save();

    res.status(201).json({
      success: true,
      newBorrow,
    });
  } catch (error) {
    console.error(error); // Log the error
    next(new ErrorHandler("Borrow creation failed", 500));
  }
};

exports.getBorrows = async (req, res, next) => {
  try {
    const borrows = await Borrow.find();
    res.status(200).json({
      success: true,
      borrows,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to retrieve borrows", 500));
  }
};

exports.getBorrowById = async (req, res, next) => {
  try {
    const borrow = await Borrow.findById(req.params.id);

    if (!borrow) {
      return next(new ErrorHandler("Borrow not found", 404));
    }

    res.status(200).json({
      success: true,
      borrow,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to retrieve the borrow", 500));
  }
};

exports.updateBorrow = async (req, res, next) => {
  try {
    const {
      equipment,
      quantity,
      reason_borrow,
      date_borrow,
      date_return,
      issue,
      status,
      reason_status,
    } = req.body;
    const borrow = await Borrow.findById(req.params.id);

    if (!borrow) {
      return next(new ErrorHandler("Borrow not found", 404));
    }

    // Update borrow properties
    borrow.equipment = equipment;
    borrow.quantity = quantity;
    borrow.reason_borrow = reason_borrow;
    borrow.date_borrow = date_borrow;
    borrow.date_return = date_return;
    borrow.issue = issue;
    borrow.status = status;
    borrow.reason_status = reason_status;

    const updatedBorrow = await borrow.save();

    res.status(200).json({
      success: true,
      borrow: updatedBorrow,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to update the borrow", 500));
  }
};

exports.deleteBorrow = async (req, res, next) => {
  try {
    const borrow = await Borrow.findById(req.params.id);

    if (!borrow) {
      return next(new ErrorHandler("Borrow not found", 404));
    }

    await borrow.remove();
    res.status(200).json({
      success: true,
      message: "Borrow deleted",
    });
  } catch (error) {
    next(new ErrorHandler("Failed to delete the borrow", 500));
  }
};

exports.myBorrows = async (req, res, next) => {
  try {
    console.log("User ID:", req.user._id); // Add this line for debugging
    const borrows = await Borrow.find({ userId: req.user._id });

    res.status(200).json({
      success: true,
      borrows,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to retrieve user borrows", 500));
  }
};

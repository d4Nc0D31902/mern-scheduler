const Borrow = require("../models/borrowing");
const ErrorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");

// @desc    Create a new borrow
// @route   POST /api/borrows
// @access  Private (You can define your own authentication middleware)

exports.createBorrow = async (req, res, next) => {
  try {
    const { equipment, quantity, reason_borrow, date_borrow, date_return, issue, status, reason_status } = req.body;

    // Create a new instance of the Borrow model
    const newBorrow = await Borrow.create({
      user: req.user._id, // Assuming you have user information in the request
      equipment,
      quantity,
      reason_borrow,
      date_borrow,
      date_return,
      issue,
      status,
      reason_status,
    });

    res.status(201).json({
      success: true,
      newBorrow,
    });
  } catch (error) {
    console.error(error); // Log the error
    next(new ErrorHandler("Borrow creation failed", 500));
  }
};

// @desc    Get all borrows
// @route   GET /api/borrows
// @access  Public (you can define your own access control)

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

// @desc    Get a single borrow by ID
// @route   GET /api/borrows/:id
// @access  Public (you can define your own access control)

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

// @desc    Update a borrow by ID
// @route   PUT /api/borrows/:id
// @access  Private (You can define your own authentication middleware)

exports.updateBorrow = async (req, res, next) => {
  try {
    const { equipment, quantity, reason_borrow, date_borrow, date_return, issue, status, reason_status } = req.body;
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

// @desc    Delete a borrow by ID
// @route   DELETE /api/borrows/:id
// @access  Private (You can define your own access control)

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
    const borrows = await Borrow.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      borrows,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to retrieve user borrows", 500));
  }
};


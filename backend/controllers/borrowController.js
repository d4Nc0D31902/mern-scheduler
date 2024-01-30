const Borrow = require("../models/borrowing");
const Equipment = require("../models/equipment");
const ErrorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");

exports.createBorrow = async (req, res, next) => {
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

  const borrowing = await Borrow.create({
    userId: req.user._id,
    user: `${req.user.name} - ${req.user.department}, ${req.user.course}, ${req.user.year}`,
    equipment,
    quantity,
    reason_borrow,
    date_borrow,
    date_return,
    issue,
    status,
    reason_status,
  });

  res.status(200).json({
    success: true,
    borrowing,
  });
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

    // If the status changes to "Approved", decrease the stock
    if (status === "Approved" && borrow.status !== "Approved") {
      const equipmentDetails = await Equipment.findOne({ name: equipment });

      if (!equipmentDetails) {
        return next(new ErrorHandler("Equipment not found", 404));
      }

      // Decrease the stock of the equipment based on the quantity
      equipmentDetails.stock -= quantity;

      await equipmentDetails.save();
    }

    // If the status changes to "Returned", increase the stock
    if (status === "Returned" && borrow.status !== "Returned") {
      const equipmentDetails = await Equipment.findOne({ name: equipment });

      if (!equipmentDetails) {
        return next(new ErrorHandler("Equipment not found", 404));
      }

      // Increase the stock of the equipment based on the quantity
      equipmentDetails.stock += quantity;

      await equipmentDetails.save();
    }

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

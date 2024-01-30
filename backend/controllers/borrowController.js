const Borrow = require("../models/borrowing");
const Equipment = require("../models/equipment");
const ErrorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");

const checkAndHandleExpiredBorrows = async () => {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  try {
    const expiredBorrows = await Borrow.find({
      status: "Pending",
      date_borrow: { $lte: threeDaysAgo },
    });

    await Borrow.updateMany(
      { _id: { $in: expiredBorrows.map((borrow) => borrow._id) } },
      { status: "Denied" }
    );
  } catch (error) {
    console.error(
      "Error occurred while checking for expired borrow requests:",
      error
    );
  }
};

setInterval(checkAndHandleExpiredBorrows, 24 * 60 * 60 * 1000);

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

  try {
    const defaultStatus = "Pending";

    const borrowing = await Borrow.create({
      userId: req.user._id,
      user: `${req.user.name} - ${req.user.department}, ${req.user.course}, ${req.user.year}`,
      equipment,
      quantity,
      reason_borrow,
      date_borrow,
      date_return,
      issue,
      status: defaultStatus,
      reason_status,
    });

    res.status(200).json({
      success: true,
      borrowing,
    });
  } catch (error) {
    console.error(error);
    next(new ErrorHandler("Failed to create borrow request", 500));
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

    if (status === "Approved" && borrow.status !== "Approved") {
      const equipmentDetails = await Equipment.findOne({ name: equipment });

      if (!equipmentDetails) {
        return next(new ErrorHandler("Equipment not found", 404));
      }

      equipmentDetails.stock -= quantity;

      await equipmentDetails.save();
    }

    if (status === "Returned" && borrow.status !== "Returned") {
      const equipmentDetails = await Equipment.findOne({ name: equipment });

      if (!equipmentDetails) {
        return next(new ErrorHandler("Equipment not found", 404));
      }

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
    console.log("User ID:", req.user._id);
    const borrows = await Borrow.find({ userId: req.user._id });

    res.status(200).json({
      success: true,
      borrows,
    });
  } catch (error) {
    next(new ErrorHandler("Failed to retrieve user borrows", 500));
  }
};

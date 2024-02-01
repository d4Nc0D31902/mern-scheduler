const Borrowing = require("../models/borrowing");
const Equipment = require("../models/equipment");

const ErrorHandler = require("../utils/errorHandler");
const mongoose = require("mongoose");

exports.newBorrowing = async (req, res, next) => {
  const {
    // userId,
    borrowItems,
    borrowingInfo,
    date_return,
    issue,
    status,
    reason_status,
  } = req.body;
  const borrowing = await Borrowing.create({
    userId: req.user._id,
    user: `${req.user.name} - ${req.user.department}, ${req.user.course}, ${req.user.year}`,
    borrowItems,
    borrowingInfo,
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

exports.getSingleBorrowing = async (req, res, next) => {
  const borrowing = await Borrowing.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!borrowing) {
    return next(new ErrorHandler("No Borrowing found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    borrowing,
  });
};

exports.myBorrowings = async (req, res, next) => {
  const borrowings = await Borrowing.find({ userId: req.user._id });
  res.status(200).json({
    success: true,
    borrowings,
  });
};

exports.allBorrowings = async (req, res, next) => {
  const borrowings = await Borrowing.find();
  borrowings.forEach((borrowing) => {});
  res.status(200).json({
    success: true,
    borrowings,
  });
};

exports.updateBorrowing = async (req, res, next) => {
  const borrowing = await Borrowing.findById(req.params.id);
  if (!borrowing) {
    return next(new ErrorHandler("Borrowing not found", 404));
  }

  if (borrowing.status === "Returned") {
    return next(
      new ErrorHandler("This borrowing has already been returned", 400)
    );
  }

  borrowing.borrowItems.forEach(async (item) => {
    const equipment = await Equipment.findById(item.equipment);
    if (!equipment) {
      throw new Error("Equipment not found");
    }

    if (borrowing.status === "Borrowed") {
      equipment.stock -= item.quantity;
    } else if (borrowing.status === "Returned") {
      equipment.stock += item.quantity;
    }

    await equipment.save();
  });

  borrowing.status = req.body.status;
  borrowing.date_return = borrowing.status === "Returned" ? Date.now() : null; // Set date_returned based on status
  borrowing.reason_status = req.body.reason_status; // Update reason_status
  borrowing.issue = req.body.issue; // Update issue

  await borrowing.save();

  res.status(200).json({ success: true });
};

exports.deleteBorrowing = async (req, res, next) => {
  const borrowing = await Borrowing.findById(req.params.id);

  if (!borrowing) {
    return next(new ErrorHandler("No Borrowing found with this ID", 404));
  }

  await borrowing.remove();

  res.status(200).json({
    success: true,
  });
};

async function updateEquipmentStock(id, quantity) {
  const equipment = await Equipment.findById(id);
  // Update equipment stock logic if needed
  await equipment.save({ validateBeforeSave: false });
}

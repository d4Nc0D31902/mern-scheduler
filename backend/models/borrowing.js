const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  user: {
    type: String,
    required: true,
  },
  equipment: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  reason_borrow: {
    type: String,
    required: true,
  },
  date_borrow: {
    type: Date,
    required: true,
  },
  date_return: {
    type: Date,
    required: true,
    default: " ",
  },
  issue: {
    type: String,
    required: true,
    enum: {
      values: [
        "Damage",
        "Missing",
        "Incorrect Equipment",
        "Dirty or Unhygienic Equipment",
        "Incomplete Sets",
        "Incorrect Use or Mishandling",
        "Stolen or Unreturned Items",
        "Overdue",
      ],
    },
    default: "N/A",
  },
  status: {
    type: String,
    default: "Pending",
  },
  reason_status: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Borrowing", borrowingSchema);

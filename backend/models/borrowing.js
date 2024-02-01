const mongoose = require("mongoose");

const borrowingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  user: {
    type: String,
    required: true,
  },

  borrowItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      equipment: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Equipment",
      },
    },
  ],
  borrowingInfo: {
    date_borrow: {
      type: Date,
      required: true,
    },
    reason_borrow: {
      type: String,
      required: true,
    },
  },
  date_return: {
    type: Date,
    default: null, // or any default date value you prefer
  },
  issue: {
    type: String,
    required: true,
    enum: {
      values: [
        "N/A",
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
    default: "N/A",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

borrowingSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

borrowingSchema.set("toJSON", {
  virtuals: true,
});

const Borrowing = mongoose.model("Borrowing", borrowingSchema);

module.exports = Borrowing; // Exporting the model

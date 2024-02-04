const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    requester: {
      type: String,
      required: true,
    },
    attendees: {
      type: [String],
      required: true,
      default: "N/A",
    },
    location: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    timeStart: {
      type: Date,
      required: true,
    },
    timeEnd: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    reason: {
      type: String,
      default: "N/A",
    },
    key: {
      type: String,
      maxlength: [6],
      default: " ",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Appointment", schema);

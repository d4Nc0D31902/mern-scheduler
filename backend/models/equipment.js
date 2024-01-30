// models/equipment.js

const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

module.exports = mongoose.model("Equipment", equipmentSchema);

const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    purchased: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Grocery", grocerySchema);
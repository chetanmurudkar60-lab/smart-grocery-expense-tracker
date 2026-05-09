const express = require("express");

const Grocery = require("../models/Grocery");

const router = express.Router();


// ADD GROCERY
router.post("/add", async (req, res) => {
  try {

    const { productName, quantity } = req.body;

    const grocery = new Grocery({
      productName,
      quantity,
    });

    await grocery.save();

    res.status(201).json({
      message: "Grocery added successfully",
      grocery,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});


// GET ALL GROCERIES
router.get("/", async (req, res) => {
  try {

    const groceries = await Grocery.find();

    res.status(200).json(groceries);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});


// DELETE GROCERY
router.delete("/:id", async (req, res) => {
  try {

    await Grocery.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Grocery deleted",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});


// TOGGLE PURCHASED
router.put("/:id", async (req, res) => {
  try {

    const grocery =
      await Grocery.findById(req.params.id);

    grocery.purchased =
      !grocery.purchased;

    await grocery.save();

    res.status(200).json(grocery);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});


// UPDATE QUANTITY
router.put("/update/:id", async (req, res) => {
  try {

    const { quantity } = req.body;

    const grocery =
      await Grocery.findByIdAndUpdate(

        req.params.id,

        {
          quantity,
        },

        {
          new: true,
        }
      );

    res.status(200).json(grocery);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});


module.exports = router;
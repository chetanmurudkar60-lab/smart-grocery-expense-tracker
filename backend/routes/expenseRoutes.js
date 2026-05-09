const express = require("express");

const Expense = require("../models/Expense");

const router = express.Router();


// ADD EXPENSE
router.post("/add", async (req, res) => {
  try {

    const { amount, category, note } = req.body;

    const expense = new Expense({
      amount,
      category,
      note,
    });

    await expense.save();

    res.status(201).json({
      message: "Expense added successfully",
      expense,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});


// GET ALL EXPENSES
router.get("/", async (req, res) => {
  try {

    const expenses = await Expense.find().sort({
      createdAt: -1,
    });

    res.status(200).json(expenses);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});


// DELETE EXPENSE
router.delete("/:id", async (req, res) => {
  try {

    await Expense.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message: "Expense deleted",
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
});

module.exports = router;
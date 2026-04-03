const express = require("express");
const router = express.Router();

const Transaction = require("../models/Transaction");
const checkRole = require("../middleware/roleMiddleware");


router.post("/", checkRole(["admin"]), async (req, res) => {
  try {

    if (!req.body.amount || !req.body.type || !req.body.category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const transaction = new Transaction(req.body);
    const saved = await transaction.save();

    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", checkRole(["admin", "analyst", "viewer"]), async (req, res) => {
  try {
    const { type, category } = req.query;

    let filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;

    const transactions = await Transaction.find(filter);

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/summary", checkRole(["admin", "analyst"]), async (req, res) => {
  try {
    const transactions = await Transaction.find();

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
      if (t.type === "income") totalIncome += t.amount;
      else totalExpense += t.amount;
    });

    const categorySummary = await Transaction.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      categorySummary   
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/:id", checkRole(["admin"]), async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.delete("/:id", checkRole(["admin"]), async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/summary", checkRole(["admin", "analyst"]), async (req, res) => {
  try {
    const transactions = await Transaction.find();

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
      if (t.type === "income") totalIncome += t.amount;
      else totalExpense += t.amount;
    });

    res.json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
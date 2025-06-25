const Calculation = require("../models/calculation");

// Evaluate the math expression safely
function evaluateExpression(expression) {
  // Only allow numbers, +, -, *, /, ., (, )
  if (!/^[\d+\-*/().\s]+$/.test(expression)) {
    throw new Error("Invalid characters in expression");
  }
  // eslint-disable-next-line no-eval
  return eval(expression);
}

exports.calculate = async (req, res) => {
  try {
    const { expression } = req.body;
    if (!expression) {
      return res.status(400).json({ message: "Expression is required" });
    }

    const result = evaluateExpression(expression);

    // Save calculation to DB
    const calculation = new Calculation({
      userId: req.user.id,
      expression,
      result,
    });
    await calculation.save();

    res.json({ result });
  } catch (err) {
    res.status(400).json({ message: "Invalid expression" });
  }
};

exports.fetchHistory = async (req, res) => {
  try {
    const history = await Calculation.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(20);
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch history" });
  }
};

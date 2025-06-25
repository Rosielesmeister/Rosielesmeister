import React, { useState, useEffect } from "react";

const Calculator = () => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  const handleCalculate = async () => {
    const response = await fetch("/api/calculations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ expression }),
    });

    const data = await response.json();
    setResult(data.result);
    fetchHistory(); // Update history after calculation
  };

  const fetchHistory = async () => {
    const response = await fetch("/api/history", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await response.json();
    setHistory(data);
  };

  useEffect(() => {
    fetchHistory(); // Fetch history on component mount
  }, []);

  return (
    <div>
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
      />
      <button onClick={handleCalculate}>Calculate</button>
      {result !== null && <h3>Result: {result}</h3>}
      <h4>Calculation History:</h4>
      <ul>
        {history.map((calc) => (
          <li key={calc._id}>
            {calc.expression} = {calc.result}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calculator;

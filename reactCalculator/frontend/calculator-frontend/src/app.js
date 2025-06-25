import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Calculator from "../components/Calculator";
import Login from "../components/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </Router>
  );
};

export default App;

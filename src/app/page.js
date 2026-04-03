"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  // Apply theme
  useEffect(() => {
    document.body.className = darkMode ? "dark" : "light";
  }, [darkMode]);

  // Operator check
  const isOperator = (char) => ["+", "-", "*", "/"].includes(char);

  // Validation
  const isValidInput = (prev, value) => {
    if (!prev) {
      return value !== "+" && value !== "*" && value !== "/";
    }

    const lastChar = prev[prev.length - 1];

    // Prevent consecutive operators
    if (isOperator(lastChar) && isOperator(value)) {
      return false;
    }

    // Prevent multiple decimals in same number
    if (value === ".") {
      const parts = prev.split(/[\+\-\*\/]/);
      const lastNumber = parts[parts.length - 1];
      if (lastNumber.includes(".")) return false;
    }

    return true;
  };

  // Button click
  const handleClick = (value) => {
    if (input === "Error") {
      setInput(value);
      return;
    }

    if (isValidInput(input, value)) {
      setInput(input + value);
    }
  };

  // Calculate
  const calculate = () => {
    try {
      setInput(eval(input).toString());
    } catch {
      setInput("Error");
    }
  };

  // Clear
  const clear = () => setInput("");

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
        setInput((prev) => {
          if (prev === "Error") return key;
          return isValidInput(prev, key) ? prev + key : prev;
        });
      } else if (key === "Enter") {
        e.preventDefault();
        calculate();
      } else if (key === "Backspace") {
        setInput((prev) => prev.slice(0, -1));
      } else if (key === "Escape") {
        clear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input]);

  return (
    <div className="container">
      <div className="calculator">
        <div className="top-bar">
          <h1>Calculator</h1>
          <button
            className="mode-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <input type="text" value={input} readOnly className="input" />

        <div className="buttons">
          {[
            "7", "8", "9", "/",
            "4", "5", "6", "*",
            "1", "2", "3", "-",
            "0", ".", "=", "+"
          ].map((btn) => (
            <button
              key={btn}
              onClick={() =>
                btn === "=" ? calculate() : handleClick(btn)
              }
              className="btn"
            >
              {btn}
            </button>
          ))}

          <button onClick={clear} className="clear-btn">
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}
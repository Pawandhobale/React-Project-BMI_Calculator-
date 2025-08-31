import React, { useState } from "react";
import "./App.css";

function App() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState("");

  const calcBmi = (e) => {
    e.preventDefault();

    if (weight === "" || height === "" || weight <= 0 || height <= 0) {
      setMessage("⚠️ Please enter valid weight and height.");
      setBmi(null);
      return;
    }

    // Convert cm to inches
    let heightInInches = height / 2.54;
    let bmiValue = (weight / (heightInInches * heightInInches)) * 703;

    setBmi(bmiValue.toFixed(1));

    if (bmiValue < 18.5) {
      setMessage("You are underweight 😟");
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setMessage("You are healthy 💪");
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
      setMessage("You are overweight ⚠️");
    } else {
      setMessage("You are obese 🚨");
    }
  };

  const reload = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setMessage("");
  };

  return (
    <div className="bmi-container">
      <h2 className="title">BMI Calculator</h2>
      <form onSubmit={calcBmi} className="bmi-form">
        <div className="form-group">
          <label>Weight (lbs)</label>
          <input
            type="number"
            className="input-box"
            value={weight}
            placeholder="Enter your weight"
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="number"
            className="input-box"
            value={height}
            placeholder="Enter your height"
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div className="btn-group">
          <button type="submit" className="btn primary-btn">
            Calculate
          </button>
          <button type="button" onClick={reload} className="btn secondary-btn">
            Reset
          </button>
        </div>
      </form>

      {bmi && (
        <div className="result-box">
          <h3>Your BMI is: <span>{bmi}</span></h3>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState } from "react";
import TopNav from "../Components/TopNav";
import NavbarComp from "../Components/Navbar";
import Footer from "../Components/Footer";

const EmiCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [interest, setInterest] = useState(10);
  const [years, setYears] = useState(5);
  const [emi, setEmi] = useState(0);
  const [chartData, setChartData] = useState({
    labels: ["Month"],
    datasets: [
      {
        label: "EMI",
        data: [emi],
        backgroundColor: ["#36A2EB"],
        borderColor: ["#36A2EB"],
      },
    ],
  });

  const handleCalculate = () => {
    const monthlyInterestRate = interest / 100 / 12;
    const numberOfPayments = years * 12;
    const emiCalculation =
      (principal * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    setEmi(emiCalculation.toFixed(2));

    const monthlyPayments = [];
    for (let i = 1; i <= numberOfPayments; i++) {
      const monthlyPayment =
        (principal *
          monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, numberOfPayments - i)) /
        Math.pow(1 + monthlyInterestRate, numberOfPayments);
      monthlyPayments.push(monthlyPayment.toFixed(2));
    }

    setChartData({
      labels: monthlyPayments.map((payment, index) => `Month ${index + 1}`),
      datasets: [
        {
          label: "EMI",
          data: monthlyPayments,
          backgroundColor: ["#36A2EB"],
          borderColor: ["#36A2EB"],
        },
      ],
    });
  };

  return (
    <div>
      <TopNav />
      <NavbarComp />

      <div className="container calc_class ">
        <h1
          style={{ fontWeight: "600", fontSize: "40px", color: "#264653" }}
          className="mt-4 text-center "
        >
          EMI Calculator
        </h1>
        <div className="form-group">
          <label for="principal">Principal Amount:</label>
          <input
            type="number"
            id="principal"
            name="principal"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="form-control  mb-4 "
          />
        </div>
        <div className="form-group">
          <label for="interest">Interest Rate (in %):</label>
          <input
            type="number"
            id="interest"
            name="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="form-control  mb-4 "
          />
        </div>
        <div className="form-group">
          <label for="years">Loan Duration (in years):</label>
          <input
            type="number"
            id="years"
            name="years"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="form-control  mb-4 "
          />
        </div>
        <button
          type="button"
          onClick={handleCalculate}
          className="btn btn-primary"
        >
          Calculate EMI
        </button>
        <div className="result text-center fs-3">
          <p>Monthly EMI: {emi}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmiCalculator;

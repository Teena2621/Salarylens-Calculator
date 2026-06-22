import "./Calculator.css";
import { PieChart, Pie, Cell} from "recharts";
import {
  FiFileText,
  FiDollarSign,
  FiTrendingDown,
  FiPercent
} from "react-icons/fi";
import { useState } from "react";
import ComparisonModal from "../ComparisonModal";
function Calculator() {
  const [regime, setRegime] = useState("new");
  const [city, setCity] = useState("metro");
const COLORS = [
  "#69A7FF",
  "#3E82FF",
  "#8BC0FF",
  "#D8E8FF"
];

const [ctc, setCtc] = useState(1200000);
const [investment80C, setInvestment80C] = useState("");
const [health80D, setHealth80D] = useState("");
const [homeLoan24B, setHomeLoan24B] = useState("");
const ctcValue = Number(ctc || 0);
let band = "";
let activeBars = 1;

if (ctc <= 500000) {
  band = "Starter";
  activeBars = 1;
}
else if (ctc <= 1000000) {
  band = "Early Career";
  activeBars = 2;
}
else if (ctc <= 2000000) {
  band = "Mid-level";
  activeBars = 3;
}
else if (ctc <= 4000000) {
  band = "Senior";
  activeBars = 4;
}
else if (ctc <= 7500000) {
  band = "Leadership";
  activeBars = 5;
}
else {
  band = "Executive";
  activeBars = 6;
}
const [showComparison, setShowComparison] =
  useState(false);
const basic = ctcValue * 0.4;

const hra =
  city === "metro"
    ? basic * 0.5
    : basic * 0.4;

const employerPF = basic * 0.12;

const employeePF = basic * 0.12;

const specialAllowance =
  ctc -
  basic -
  hra -
  employerPF;
const professionalTax = 2400;

const deductions80C =
  Number(investment80C) || 0;

const deductions80D =
  Number(health80D) || 0;

const deductions24B =
  Number(homeLoan24B) || 0;

let taxableIncome = ctcValue;

if (regime === "old") {
  taxableIncome =
    ctcValue -
    hra -
    deductions80C -
    deductions80D -
    deductions24B;
}
function calculateTax(income, regime) {
  let tax = 0;

  if (regime === "new") {
    if (income > 1500000) {
      tax += (income - 1500000) * 0.30;
      income = 1500000;
    }

    if (income > 1200000) {
      tax += (income - 1200000) * 0.20;
      income = 1200000;
    }

    if (income > 1000000) {
      tax += (income - 1000000) * 0.15;
      income = 1000000;
    }

    if (income > 700000) {
      tax += (income - 700000) * 0.10;
      income = 700000;
    }

    if (income > 300000) {
      tax += (income - 300000) * 0.05;
    }
  }

  if (regime === "old") {
    if (income > 1000000) {
      tax += (income - 1000000) * 0.30;
      income = 1000000;
    }

    if (income > 500000) {
      tax += (income - 500000) * 0.20;
      income = 500000;
    }

    if (income > 250000) {
      tax += (income - 250000) * 0.05;
    }
  }

  tax = tax * 1.04; // 4% cess
return Math.max(0, tax);
}
const incomeTax = calculateTax(
  taxableIncome,
  regime
);

const totalDeductions =
  employeePF +
  professionalTax +
  incomeTax;

const yearlyInHand =
  ctcValue - totalDeductions;
const monthlyInHand =
  yearlyInHand / 12;

const effectiveTax =
  ctcValue > 0
    ? (incomeTax / ctcValue) * 100
    : 0;

// REAL OLD REGIME CALCULATION

const oldTaxableIncome =
  ctcValue -
  hra -
  deductions80C -
  deductions80D -
  deductions24B;

const oldTax = calculateTax(
  Math.max(0, oldTaxableIncome),
  "old"
);

const oldTotalDeductions =
  oldTax +
  employeePF +
  professionalTax;

const oldYearlyInHand =
  ctc -
  oldTotalDeductions;

const oldMonthlyInHand =
  oldYearlyInHand / 12;

const oldEffectiveTax =
  ctc > 0
    ? (oldTax / ctc) * 100
    : 0;


// NEW REGIME CALCULATION

const newTaxableIncome = ctcValue;

const newTax = calculateTax(
  newTaxableIncome,
  "new"
);

const newTotalDeductions =
  newTax +
  employeePF +
  professionalTax;

const newYearlyInHand =
  ctc -
  newTotalDeductions;

const newMonthlyInHand =
  newYearlyInHand / 12;

const newEffectiveTax =
  ctc > 0
    ? (newTax / ctc) * 100
    : 0;

const takeHomePercent =
  ctcValue > 0
    ? ((yearlyInHand / ctcValue) * 100).toFixed(1)
    : 0;

const pieData = [
  {
    name: "Take-home",
    value: yearlyInHand
  },
  {
    name: "Income Tax",
    value: incomeTax
  },
  {
    name: "PF",
    value: employeePF
  },
  {
    name: "Prof. Tax",
    value: professionalTax
  }
];
  return (
    <section className="calculator" id="calculator">

      <div className="calculator-heading">
        <span>CALCULATOR</span>

        <h1>
          From CTC to <span>in-hand</span>, line by line.
        </h1>
      </div>

      <div className="calculator-grid">


        <div className="form-card">

          <h2>Your numbers</h2>
          <p>Adjust to see your live take-home.</p>

          <div className="form-group">
             <div className="label-row">
  <label>ANNUAL CTC</label>
  <span>Cost to company</span>
</div>

              <div className="ctc-box">
  <span className="rupee">₹</span>
  <input
  className="ctc-input"
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  value={ctc}
  onChange={(e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCtc(value);
  }}
  placeholder="Enter CTC"
/>
</div>

            <input
  type="range"
  min="100000"
  max="10000000"
  value={ctc}
  onChange={(e) => setCtc(Number(e.target.value))}
/>

            <div className="range-labels">
              <span>₹1L</span>
              <span>₹1Cr</span>
            </div>
          </div>

          <div className="form-group">
            <label>TAX REGIME</label>

             <div className="toggle">
  <button
    className={regime === "new" ? "active" : ""}
    onClick={() => setRegime("new")}
  >
    New (FY 24-25)
  </button>

  <button
    className={regime === "old" ? "active" : ""}
    onClick={() => setRegime("old")}
  >
    Old regime
  </button>
</div>
          </div>

          <div className="form-group">
            <label>CITY TYPE (HRA)</label>

             <div className="toggle">
  <button
    className={city === "metro" ? "active" : ""}
    onClick={() => setCity("metro")}
  >
    Metro
  </button>

  <button
    className={city === "nonmetro" ? "active" : ""}
    onClick={() => setCity("nonmetro")}
  >
    Non-metro
  </button>
</div>
          </div>
          {regime === "old" && (
  <div className="old-regime-section">

    <hr className="old-divider" />

    <h4>OLD REGIME DEDUCTIONS</h4>

     <div className="deduction-group">
  <div className="deduction-header">
    <label>80C INVESTMENTS</label>
    <span>Max ₹1.5L</span>
  </div>

  <input
  type="text"
  inputMode="numeric"
  className="deduction-input"
  placeholder="₹ Enter amount"
  value={investment80C}
  onChange={(e)=>{
    const value =
      e.target.value.replace(/[^0-9]/g, "");

    if(value === ""){
      setInvestment80C("");
      return;
    }

    if(Number(value) <= 150000){
      setInvestment80C(value);
    }
  }}
/>

   <input
  type="range"
  min="0"
  max="150000"
  value={investment80C === "" ? 0 : investment80C}
  onChange={(e)=>setInvestment80C(e.target.value)}
/>
  <div className="range-labels">
    <span>₹0</span>
    <span>₹1.5L</span>
  </div>
</div>
     <div className="deduction-group">
  <div className="deduction-header">
    <label>80D HEALTH INSURANCE</label>
    <span>Max ₹75K</span>
  </div>

  <input
  type="text"
  inputMode="numeric"
  className="deduction-input"
  placeholder="₹ Enter amount"
  value={health80D}
  onChange={(e)=>{
    const value =
      e.target.value.replace(/[^0-9]/g, "");

    if(value === ""){
      setHealth80D("");
      return;
    }

    if(Number(value) <= 75000){
      setHealth80D(value);
    }
  }}
/>

  <input
  type="range"
  min="0"
  max="75000"
  value={health80D === "" ? 0 : health80D}
  onChange={(e)=>setHealth80D(e.target.value)}
/>

  <div className="range-labels">
    <span>₹0</span>
    <span>₹75K</span>
  </div>
</div>

     <div className="deduction-group">
  <div className="deduction-header">
    <label>HOME LOAN INTEREST (24B)</label>
    <span>Max ₹2L</span>
  </div>

  <input
  type="text"
  inputMode="numeric"
  className="deduction-input"
  placeholder="₹ Enter amount"
  value={homeLoan24B}
  onChange={(e)=>{
    const value =
      e.target.value.replace(/[^0-9]/g, "");

    if(value === ""){
      setHomeLoan24B("");
      return;
    }

    if(Number(value) <= 200000){
      setHomeLoan24B(value);
    }
  }}
/>

   <input
  type="range"
  min="0"
  max="200000"
  value={homeLoan24B === "" ? 0 : homeLoan24B}
  onChange={(e)=>setHomeLoan24B(e.target.value)}
/>

  <div className="range-labels">
    <span>₹0</span>
    <span>₹2L</span>
  </div>
</div>

    <label className="checkbox-row">
      <input type="checkbox" />
      Claim HRA exemption (assumes rent paid)
    </label>

  </div>
)}
          <button
  className="compare-btn"
  onClick={() =>
    setShowComparison(true)
  }
>
  Compare both regimes
</button>

        </div>

        

        <div className="results">

          <div className="monthly-card">
            <div className="top-row">
              <span>MONTHLY IN-HAND</span>
              <span>
  {regime === "new" ? "NEW REGIME" : "OLD REGIME"}
  {" • "}
  {city === "metro" ? "METRO" : "NON-METRO"}
</span>
            </div>

            <h1>
₹{Math.round(monthlyInHand).toLocaleString("en-IN")}
</h1>

            <p>
₹{Math.round(yearlyInHand).toLocaleString("en-IN")} / year
</p>

            <div className="band">

  <div className="band-left">
    <small>BAND</small>
    <h4>{band}</h4>
  </div>

  <div className="band-bars">
     {[1,2,3,4,5,6].map((bar) => (
  <span
    key={bar}
    className={
      bar <= activeBars
        ? "active"
        : ""
    }
  ></span>
))}
  </div>

  <div className="band-right">
    ₹{(ctc / 100000).toFixed(2)}L
  </div>

</div>
          </div>

          <div className="stats-grid">

            <div className="stat-card">
  <div className="stat-header">
  <FiFileText className="stat-icon" />
  <h4>GROSS/YR</h4>
</div>
  <h2>
₹{(ctc / 100000).toFixed(2)}L
</h2>
</div>

            <div className="stat-card">
                <div className="stat-header">
    <FiDollarSign className="stat-icon" />
    <h4>TOTAL TAX</h4>
  </div>

              <h2>
₹{Math.round(incomeTax).toLocaleString("en-IN")}
</h2>
            </div>

            <div className="stat-card">
               <div className="stat-header">
              <FiTrendingDown className="stat-icon" />
              <h4>DEDUCTIONS</h4>
               </div>
              <h2>
₹{Math.round(totalDeductions).toLocaleString("en-IN")}
</h2>
               
            </div>

            <div className="stat-card">
                 <div className="stat-header stat-header-tax">
  <FiPercent className="stat-icon" />
  <h4>
    EFFECTIVE
    <br />
    TAX
  </h4>
</div>
              <h2>
{effectiveTax.toFixed(1)}%
</h2>
            </div>

          </div>

          <div className="breakdown-card">
            <h3>ANNUAL BREAKDOWN</h3>

            <div className="break-item">

  <div className="item">
    <span>+ Basic</span>
    <span>₹{(basic / 100000).toFixed(2)}L</span>
  </div>

  <div className="progress">
    <div
      className="fill"
      style={{  width: `${(basic / ctcValue) * 100}%` }}
    ></div>
  </div>

</div>
            <div className="break-item">

  <div className="item">
    <span>+ HRA</span>
    <span>₹{(hra / 100000).toFixed(2)}L</span>
  </div>

  <div className="progress">
    <div
      className="fill blue"
      style={{ width: `${(hra / ctcValue) * 100}%` }}
    ></div>
  </div>

</div>

            <div className="break-item">

  <div className="item">
    <span>+ Special allowance</span>
    <span>₹{(specialAllowance / 100000).toFixed(2)}L</span>
  </div>

  <div className="progress">
    <div
      className="fill blue"
      style={{  width: `${(specialAllowance / ctcValue) * 100}%`}}
    ></div>
  </div>

</div>

            <div className="break-item">

  <div className="item">
    <span>+ PF (Employer)</span>
    <span>₹{Math.round(employerPF).toLocaleString("en-IN")}</span>
  </div>

  <div className="progress">
    <div
      className="fill dot"
      style={{
  width: `${Math.min(
  employerPF / 10000,
  80
)}%`
}}
    ></div>
  </div>

</div>
 <div className="break-item">
  <div className="item">
    <span>- PF (Employee)</span>
    <span>₹{Math.round(employeePF).toLocaleString("en-IN")}</span>
  </div>

  <div className="progress">
    <div
      className="fill dot"
       style={{
  width: `${Math.min(
  employeePF / 10000,
  80
)}%`
}}
    ></div>
  </div>
</div>
             <div className="break-item">

  <div className="item">
    <span>- Income Tax + cess</span>
    <span>₹{Math.round(incomeTax).toLocaleString("en-IN")}</span>
  </div>

  <div className="progress">
     <div
  className="fill blue"
  style={{
    width: `${Math.min(
      incomeTax / 50000,
      80
    )}%`
  }}
></div>
  </div>

</div>
  <div className="break-item">
  <div className="item">
    <span>- Professional Tax</span>
    <span>₹{professionalTax.toLocaleString("en-IN")}</span>
  </div>

  <div className="progress">
     <div
  className="fill blue"
  style={{
    width: `${Math.max(
      professionalTax / 500,
      8
    )}%`
  }}
></div>
  </div>
</div>
          </div>

          <div className="chart-card">
            <h3>CTC COMPOSITION</h3>

            <div className="chart-container">

  <div className="pie-wrapper">

    <PieChart
      width={180}
      height={180}
    >
      <Pie
        data={pieData}
        dataKey="value"
        innerRadius={52}
        outerRadius={70}
        paddingAngle={1}
        animationBegin={0}
  animationDuration={1200}
  animationEasing="ease-out"
      >
        {pieData.map((entry, index) => (
          <Cell
            key={index}
            fill={COLORS[index]}
          />
        ))}
      </Pie>
    </PieChart>

    <div className="pie-center">
  <span>TAKE-HOME</span>
  <h2>{takeHomePercent}%</h2>
</div>

  </div>

  <div className="legend">

  <div className="legend-row">
    <div className="legend-left">
      <span className="dot blue1"></span>
      <span>Take-home</span>
    </div>
    <span>₹{Math.round(yearlyInHand).toLocaleString("en-IN")}</span>
  </div>

  <div className="legend-row">
    <div className="legend-left">
      <span className="dot blue2"></span>
      <span>Income Tax</span>
    </div>
    <span>₹{Math.round(incomeTax).toLocaleString("en-IN")}</span>
  </div>

  <div className="legend-row">
    <div className="legend-left">
      <span className="dot blue3"></span>
      <span>PF</span>
    </div>
    <span>₹{Math.round(employeePF).toLocaleString("en-IN")}</span>
  </div>

  <div className="legend-row">
    <div className="legend-left">
      <span className="dot blue4"></span>
      <span>Prof. Tax</span>
    </div>
    <span>₹{professionalTax.toLocaleString("en-IN")}</span>
  </div>

</div>

</div>
          </div>

        </div>

      </div>
     <ComparisonModal
  isOpen={showComparison}
  onClose={() =>
    setShowComparison(false)
  }

  newData={{
    monthlyInHand:
      newMonthlyInHand,

    yearlyInHand:
      newYearlyInHand,

    tax:
      newTax,

    effectiveTax:
      newEffectiveTax
  }}

  oldData={{
    monthlyInHand:
      oldMonthlyInHand,

    yearlyInHand:
      oldYearlyInHand,

    tax:
      oldTax,

    effectiveTax:
      oldEffectiveTax
  }}
/>
    </section>
  );
}

export default Calculator;
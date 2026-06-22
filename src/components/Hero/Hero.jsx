import "./Hero.css";
import { motion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="tag">
          ✦ FY 2024-25 • NO LOGIN REQUIRED
        </span>
        <h1>
          What you <span>actually</span>
          <br />
          take home.
        </h1>
        <p>
          See exactly how your CTC breaks into monthly in-hand —
          every deduction, every rupee, both tax regimes side-by-side.
        </p>
        <div className="btns">
          <button
  className="primary"
  onClick={() => {
    document
      .getElementById("calculator")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  }}
>
  Calculate my salary
  <FiArrowDown />
</button>
            <button
  className="secondary"
  onClick={() => {
    document
      .getElementById("tips")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
  }}
>
  Tax-saving tips
</button>
        </div>
        <div className="stats">
          <div>
            <h2>₹15L</h2>
            <span>SAMPLE CTC</span>
          </div>
          <div>
            <h2>₹1.11L</h2>
            <span>PER MONTH</span>
          </div>
          <div>
            <h2>89%</h2>
            <span>TAKE-HOME</span>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <motion.div
          className="salary-card"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{ rotate: 6 }}
        >
          <p className="card-label">MONTHLY IN-HAND</p>
          <h2 className="salary-value">₹1.11L</h2>
          <hr />
          <div className="row">
            <span>Gross salary</span>
            <span>₹1.23L/mo</span>
          </div>
          <div className="row">
            <span>Income tax</span>
            <span>-₹10,459/mo</span>
          </div>
          <div className="row">
            <span>PF + PT</span>
            <span>-₹2,000/mo</span>
          </div>
          <p className="estimate">NEW REGIME • METRO • ESTIMATE</p>
        </motion.div>

        <motion.div
          className="tax-card"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.8 }}
          style={{ rotate: -3 }}
        >
          <p>TAX SAVED</p>
          <h2>₹47K</h2>
          <span>vs Old regime, no investments</span>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
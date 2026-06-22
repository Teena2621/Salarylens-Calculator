import "./ComparisonModal.css";

function ComparisonModal({
  isOpen,
  onClose,
  newData,
  oldData
}) {
  if (!isOpen) return null;

  const better =
    newData.yearlyInHand >
    oldData.yearlyInHand;

  const difference =
    Math.abs(
      newData.yearlyInHand -
      oldData.yearlyInHand
    );

  return (
    <div className="modal-overlay">

      <div className="modal-panel">

        <button
          className="close-btn"
          onClick={onClose}
        >
          ✕
        </button>

        <span className="modal-tag">
          COMPARISON
        </span>

        <h1>
          New vs Old regime
        </h1>

        <div className="compare-cards">

          <div
            className={`compare-card ${
              better ? "winner" : ""
            }`}
          >
            <div className="card-top">
              <span>NEW REGIME</span>

              {better && (
                <span className="badge">
                  BETTER
                </span>
              )}
            </div>

            <h2>
              ₹
              {Math.round(
                newData.monthlyInHand
              ).toLocaleString("en-IN")}
            </h2>

            <p>
              ₹
              {Math.round(
                newData.yearlyInHand
              ).toLocaleString("en-IN")}
              /yr
            </p>

            <div className="mini-row">
              <span>Tax</span>
              <span>
                ₹
                {Math.round(
                  newData.tax
                ).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="mini-row">
              <span>Effective</span>
              <span>
                {newData.effectiveTax.toFixed(
                  1
                )}
                %
              </span>
            </div>
          </div>

          <div
            className={`compare-card ${
              !better ? "winner" : ""
            }`}
          >
            <div className="card-top">
              <span>OLD REGIME</span>

              {!better && (
                <span className="badge">
                  BETTER
                </span>
              )}
            </div>

            <h2>
              ₹
              {Math.round(
                oldData.monthlyInHand
              ).toLocaleString("en-IN")}
            </h2>

            <p>
              ₹
              {Math.round(
                oldData.yearlyInHand
              ).toLocaleString("en-IN")}
              /yr
            </p>

            <div className="mini-row">
              <span>Tax</span>
              <span>
                ₹
                {Math.round(
                  oldData.tax
                ).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="mini-row">
              <span>Effective</span>
              <span>
                {oldData.effectiveTax.toFixed(
                  1
                )}
                %
              </span>
            </div>
          </div>

        </div>

        <div className="verdict-card">

  <span>VERDICT</span>

  <h2>
  The{" "}
  <span className="highlight-regime">
    {better ? "new regime" : "old regime"}
  </span>{" "}
  saves you ₹
  {Math.round(difference).toLocaleString("en-IN")}
  a year.
</h2>

  <p>
    Based on your current inputs, old regime benefits
    increase when deductions such as 80C, HRA,
    medical insurance and home-loan interest are maximized.
  </p>

</div>

      </div>

    </div>
  );
}

export default ComparisonModal;
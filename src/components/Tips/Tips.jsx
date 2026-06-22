import "./Tips.css";

const tips = [
  {
    id: "01",
    save: "SAVE ₹46K",
    title: "Max out 80C every April",
    desc: "EPF, ELSS, PPF, life insurance and home-loan principal all count. Plan early so you don't scramble in March.",
    tags: ["OLD REGIME", "INVESTMENTS"]
  },
  {
    id: "02",
    save: "SAVE ₹15K",
    title: "NPS 80CCD(1B) — extra ₹50K",
    desc: "An additional deduction over and above 80C, available via employer NPS. Pure upside.",
    tags: ["BOTH REGIMES", "NPS"]
  },
  {
    id: "03",
    save: "SAVE ₹23K",
    title: "Health insurance under 80D",
    desc: "Up to ₹25K for self + ₹50K for senior-citizen parents. Premiums are deductible and life is uncertain.",
    tags: ["OLD REGIME", "80D"]
  },
  {
    id: "04",
    save: "SAVE ₹40K",
    title: "Pick your regime annually",
    desc: "Salaried folks can switch regimes every year. Investments below ₹2.5L? New regime usually wins.",
    tags: ["STRATEGY"]
  },
  {
    id: "05",
    save: "SAVE ₹35K",
    title: "HRA: claim it properly",
    desc: "Submit rent receipts and landlord PAN (if rent > ₹1L/yr). Metro = 50% of basic, non-metro = 40%.",
    tags: ["OLD REGIME", "HRA"]
  },
  {
    id: "06",
    save: "SAVE ₹62K",
    title: "Home loan double deduction",
    desc: "Up to ₹2L interest under 24(b) + ₹1.5L principal under 80C. A first home is a powerful tax shelter.",
    tags: ["OLD REGIME", "HOME LOAN"]
  }
];

function Tips() {
  return (
    <section className="tips" id="tips">

      <div className="tips-heading">
        <span>TIPS</span>

        <h1>
          Six moves to keep <span>more</span> of what
          <br />
          you earn.
        </h1>
      </div>

      <div className="tips-grid">

        {tips.map((tip) => (
          <div className="tip-card" key={tip.id}>

            <div className="card-top">
              <h2>{tip.id}</h2>

              <div className="save-badge">
                {tip.save}
              </div>
            </div>

            <h3>{tip.title}</h3>

            <p>{tip.desc}</p>

            <div className="tags">
              {tip.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Tips;
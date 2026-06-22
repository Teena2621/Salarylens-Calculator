import Hero from "./components/Hero/Hero";
import Calculator from "./components/calculator/Calculator";
import Tips from "./components/Tips/Tips";
import Footer from "./components/Footer";
import "./App.css";
function App() {
  return (
    <>
      <Hero />
      <Calculator />
      <div className="section-divider"></div>
      <Tips />
      
<div className="section-divider"></div>

<Footer />
    </>
  );
}

export default App;
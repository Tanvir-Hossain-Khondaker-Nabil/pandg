import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Meta from "./Meta";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Insights from "./pages/Insights/Insights";
import CorporateSustainability from "./pages/CorporateSustainability/CorporateSustainability";
import Career from "./pages/Career/Career";
import AOS from "aos";
import "aos/dist/aos.css";
import { Dashboard } from "./pages/Dashboard";
import { ManageService } from "./pages/ManageService";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: true, // ✅ Animate on scroll up too
      offset: 100,
      easing: "ease-in-out",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-white">
      <Meta/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/insights" element={<Insights />} />
        <Route
          path="/corporatesustainability"
          element={<CorporateSustainability />}
        />
        <Route path="/career" element={<Career />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-service" element={<ManageService />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

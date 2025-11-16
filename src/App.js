import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import TargetCursor from "./components/TargetCursor";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>

      <Footer />
    </>
  );
}

export default App;

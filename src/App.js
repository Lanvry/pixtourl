import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import TargetCursor from "./components/TargetCursor";
import { Route, Routes, useLocation } from "react-router-dom";
 
import Navbar from "./components/Navbar";
 
import AppRoute from "./web/AppRoute";

function App() {
  document.title = "PIXTOURL - Konversi Gambar Ke Link"
  const location = useLocation();
  const hideLayout = ["/auth/login", "/auth/signup"].includes(location.pathname) ||
    location.pathname.startsWith("/dashboard");

  return (
    <>
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />

      {!hideLayout && <Navbar />}

      <AppRoute/>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;

import { React, useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/home";
import Upload from "../pages/upload";
import SignUp from "../pages/auth/signup";
import SignIn from "../pages/auth/signin";
import Index from "../pages/dashboard";
import MyImages from "../pages/dashboard/myimage";


function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/login" element={<SignIn />} />
      <Route path="/dashboard" element={<Index />} />
      <Route path="/dashboard/myimages" element={<Index pages="myimages" />} />
    </Routes>
  );
}

export default AppRoute;

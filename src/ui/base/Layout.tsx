import React from "react";
import { Outlet } from "react-router-dom";
import HeaderBar from "./HeaderBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";

const Layout = () => {
  return (
    <>
      <HeaderBar />
      <Outlet />
      <Footer />
      <ToastContainer position="top-center" />
    </>
  );
};

export default Layout;

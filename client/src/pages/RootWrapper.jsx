import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function RootWrapper() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default RootWrapper;

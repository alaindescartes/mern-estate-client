import React from "react";
import { Outlet } from "react-router-dom";

function RootWrapper() {
  return (
    <>
      <div>hey</div>
      <Outlet />
    </>
  );
}

export default RootWrapper;

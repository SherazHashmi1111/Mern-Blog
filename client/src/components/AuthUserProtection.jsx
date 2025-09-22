import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function AuthUserProtection() {
  const { user } = useSelector((state) => state.user);

  if (user && user.isLogedInn) {
    return <Outlet />;
  }
}

export default AuthUserProtection;

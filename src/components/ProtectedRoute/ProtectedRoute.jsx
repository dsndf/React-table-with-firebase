import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ children, userAuth }) => {
  const naviagte = useNavigate();
  useEffect(() => {
    if (!userAuth) {
      naviagte("/login");
    }
  }, [userAuth]);
  return children;
};

export default ProtectedRoute;

import React from "react";
import Login from "../Login";

import { useNavigate, Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

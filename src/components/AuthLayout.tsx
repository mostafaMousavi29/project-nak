import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useStore } from "../store/rootStore";

const AuthLayout: React.FC = () => {
  const token = useStore((s) => s.token);
  if (token) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default AuthLayout;

import React from "react";
import { Navigate } from "react-router-dom";
import { useStore } from "../store/rootStore";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useStore((s) => s.token);

  if (!token) return <Navigate to="/signin" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;

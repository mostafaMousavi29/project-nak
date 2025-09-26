import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/signIn";
// import Dashboard from './pages/dashboard/components/Dashboard'
// import Product from './pages/product/components/Product'
import ProtectedRoute from "./components/ProtectedRoute";
import AuthLayout from "./components/AuthLayout";
import SignInContainer from "./pages/signIn";
import SignUpContainer from "./pages/signUp";
import Dashboard from "./pages/dashboard";
import AttributeContainer from "./pages/attribute";
import ProductContainer from "./pages/product";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="signin" element={<SignInContainer />} />
        <Route path="signup" element={<SignUpContainer />} />
      </Route>

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/attribute"
        element={
          <ProtectedRoute>
            <AttributeContainer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product"
        element={
          <ProtectedRoute>
            <ProductContainer />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

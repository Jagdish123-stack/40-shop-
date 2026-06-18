// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

// Import the hollow pages
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import BuyerDashboard from '../pages/customer/BuyerDashboard';
import VendorDashboard from '../pages/seller/VendorDashboard';
import DeliveryDashboard from '../pages/delivery/DeliveryDashboard';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Default redirect to login for now */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      
      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* Main Dashboards */}
      <Route path="/customer" element={<BuyerDashboard />} />
      <Route path="/seller" element={<VendorDashboard />} />
      <Route path="/delivery" element={<DeliveryDashboard />} />

      {/* 404 Fallback */}
      <Route path="*" element={<div className="p-10 text-red-500">404 - Page Not Found</div>} />
    </Routes>
  );
}
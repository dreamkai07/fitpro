import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Workouts from "../pages/Workouts";
import Diet from "../pages/Diet";
import AppLayout from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function Goals() {
  return <div className="p-10 text-4xl font-bold">Goals</div>;
}

function Profile() {
  return <div className="p-10 text-4xl font-bold">Profile</div>;
}

export default function AppRouter() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workout" element={<Workouts />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
    </Routes>
  );
}
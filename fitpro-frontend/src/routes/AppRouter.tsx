import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Workouts from "../pages/Workouts";
import Diet from "../pages/Diet";
import AppLayout from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";

import Goals from "../pages/Goals";
import Profile from "../pages/Profile";
import FindTrainers from "../pages/FindTrainers";
import TrainerProfilePage from "../pages/TrainerProfilePage";
import TrainerDashboard from "../pages/TrainerDashboard";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
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
          <Route path="/trainers" element={<FindTrainers />} />
          <Route path="/trainers/:id" element={<TrainerProfilePage />} />
          <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}
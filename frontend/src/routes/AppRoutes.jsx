import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"
// import { Navigate } from "react-router-dom";
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import Students from "../pages/Students"
import Profile from "../pages/Profile";
import Classes from "../pages/Classes";
import Attendance from "../pages/Attendance";
import Assignments from "../pages/Assignments";
import Performance from "../pages/Performance";
import ForgotPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";
import ResetPassword from "../pages/ResetPassword";

import ProtectedRoute from "./ProtectedRoute"
import MainLayout from "../layouts/MainLayout"

const AppRoutes = () => {

  return (

    <BrowserRouter>

      <Routes>

        <Route
  path="/"
  element={
    <Navigate
      to="/login"
      replace
    />
  }
/>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Students />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <MainLayout>
        <Profile />
      </MainLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/classes"
  element={
    <ProtectedRoute>
      <MainLayout>
        <Classes />
      </MainLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/attendance"
  element={
    <ProtectedRoute>
      <MainLayout>
        <Attendance />
      </MainLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/assignments"
  element={
    <ProtectedRoute>
      <MainLayout>
        <Assignments />
      </MainLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/performance"
  element={
    <ProtectedRoute>
      <MainLayout>
        <Performance />
      </MainLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/forgot-password"
  element={<ForgotPassword />}
/>

<Route
  path="/verify-otp"
  element={<VerifyOtp />}
/>

<Route
  path="/reset-password"
  element={<ResetPassword />}
/>

        
      </Routes>

    </BrowserRouter>
  )
}

export default AppRoutes
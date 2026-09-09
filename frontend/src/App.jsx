import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import ProtectedRoute from './routes/ProtectedRoute';
import CreateWorkout from "./pages/CreateWorkout";
import Profile from "./pages/Profile";
import Onboarding from "./pages/Onboarding";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={< Login />} />
          <Route path="/signup" element={< SignUp />} />
          <Route path="/onboarding" element={<ProtectedRoute><Onboarding /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/workouts/new" element={<CreateWorkout />}></Route>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;

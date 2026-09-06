import { useState, useEffect } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom"
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import SignUp from './pages/Signup';
import ProtectedRoute from './routes/ProtectedRoute';
import { supabase } from './lib/supabase';

function App() {
  useEffect(() => {
    async function testConnection() {
      // if getting error while retrieving a value means connection not successful
      const { data, error } = await supabase
        .from("workouts")
        .select("id")
        .limit(1);

      if (error) {
        console.error("Supabase connection failed: ", error);
        return;
      }
      console.log("Supabase connection successful", data);
    }
    testConnection();
  }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={< Login />} />
          <Route path="/signup" element={< SignUp />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
// npm install react-router-dom
// npm install react-hook-form
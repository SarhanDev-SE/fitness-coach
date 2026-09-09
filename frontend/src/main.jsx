import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from '../src/context/AuthContext'
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// makes query/cache infrastructure availabel to all components
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  // now every component can use const {session, loading} = useAuth()

  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
  ,
)

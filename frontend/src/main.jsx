import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from '../src/context/AuthContext'

createRoot(document.getElementById('root')).render(
  // now every component can use const {session, loading} = useAuth()
  <AuthProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </AuthProvider>,
)

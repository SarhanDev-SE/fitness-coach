import {useAuth} from '../features/auth/hooks/useAuth';
import { Navigate } from 'react-router-dom';
export default function ProtectedRoute({ children }) {
    const { session, loading } = useAuth();

    if (loading) {
        return <p>Loading authentication....</p>
    }

    // if no session found navigate to dashboard
    if (!session) {
        return <Navigate to="/login" replace />
    }

    return children;
}

// loading?
//     ↓
// yes → show loading

// no session?
//     ↓
// yes → redirect login

// session exists?
//     ↓
// yes → render page
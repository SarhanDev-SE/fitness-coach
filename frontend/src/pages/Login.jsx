
import LoginForm from "../features/auth/components/LoginForm"
import { useAuth } from "../features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function Login() {
    const { session, loading } = useAuth();

    if (loading) {
        return <p>Loading authentication....</p>
    }

    // if  session found navigate to dashboard
    if (session) {
        return <Navigate to="/dashboard" replace />
    }

    return (
        <main>
            <LoginForm />
        </main>
    )
}
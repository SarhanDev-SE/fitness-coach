import LoginForm from "../features/auth/components/LoginForm"
import { useAuth } from "../features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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
        <main className="flex min-h-screen items-center justify-center p-6">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>
                        Welcome back to Repwise!
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </main>
    )
}
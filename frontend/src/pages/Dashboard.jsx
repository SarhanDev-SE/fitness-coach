import { useAuth } from '../features/auth/hooks/useAuth'
import { signOut } from '../features/auth/serivces/authService';

export default function Dashboard() {
    const { session, loading } = useAuth();

    async function handleLogout() {
        try {
            await signOut();
        } catch (error) {
            console.error("Logout failed: ", error)
        }
    }

    if(loading){
        return <p>Loading authentication....</p>
    }
    // if no session found navigate to login
    if(!session){
        return <Navigate to = "/login" replace/>
    }
    return (
        <main>
            <h1>Welcome to dashboard</h1>
            <p>Logged in as {session?.user?.email}</p>
            <button onClick={handleLogout}>Logout</button>
        </main>
    )
}


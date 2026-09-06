import { createContext, useContext, useState, useEffect } from "react"
import { supabase } from "../lib/supabase"

// creating auth context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        async function loadSession() {
            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error("Failed to get session: " + error);
            }

            if (mounted) {
                setSession(data?.session ?? null);
                setLoading(false);
            }

            
        }

        loadSession();
        
        // a callback that runs when an auth event occurs like signin, signout, getSession
        // helpful to check if user is authenticated or not when browser refreshes or user logs out, 
        // important for session refresh/expiration behaviour
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, nextSession) => {
            setSession(nextSession);
            setLoading(false);
        })

        // cleanup function runs when effect re-runs to remove previous ongoing effects
        return () => {
            mounted = false;
            subscription.unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={{ session, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}
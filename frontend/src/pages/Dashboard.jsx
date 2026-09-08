import { useAuth } from '../features/auth/hooks/useAuth'
import { signOut } from '../features/auth/services/authService';
import { Navigate } from 'react-router-dom';

import AppShell from '@/components/layout/AppShell';
import SideBar from '@/components/layout/SideBar';
import TopBar from '@/components/layout/TopBar';
import PageHeader from '@/components/common/PageHeader';
import StatCard from '@/components/common/StatCard';
import Section from '@/components/common/Section';
import LoadingState from '@/components/common/LoadingState';
import EmptyState from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
    const { session, loading } = useAuth();

    async function handleLogout() {
        try {
            await signOut();
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    }

    if (loading) {
        return <LoadingState title="Loading workout data" description="Please wait while we fetch your workout data" onAction={()=> window.location.reload()}/>
    }

    // if no session found navigate to login
    if (!session) {
        return <Navigate to="/login" replace />
    }

    return (
        <AppShell
            sidebar={<SideBar />}
            topbar={<TopBar />}
        >
            <PageHeader
                title="Dashboard"
                description={`Welcome back ${session?.user?.email}`}
            />

            <div className="mt-8">
                <p className="text-muted-fragmented">
                    Your workout analytics will appear here
                </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total workouts"
                    value="0"
                    description="No workouts yet"
                />
                <StatCard
                    title="Average Form"
                    value="-"
                    description="Start training to see you score"
                />
                <StatCard
                    title="Current streak"
                    value="0 days"
                    description="Keeep training"
                />
                <StatCard
                    title="Total reps"
                    value="0"
                    description="Across all workouts"
                />
            </div>

            <Section
                title="Recent Workouts"
                description="Your latest training sessions"
            >
                <EmptyState
                    title="No Workouts yet"
                    description="Complete your first workout and your activity will appear here"
                    action={
                        <Button>
                            Start workout
                        </Button>
                    }
                />
            </Section>
        </AppShell>

    )
}




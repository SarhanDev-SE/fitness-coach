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
import ErrorState from '@/components/common/ErrorState';
import EmptyState from '@/components/common/EmptyState';
import { Button } from '@/components/ui/button';
import { WorkoutItem } from '@/features/workouts/components/WorkoutItem';
import { useWorkouts } from '@/features/workouts/hooks/useWorkouts';

export default function Dashboard() {
    const { session } = useAuth();
    const { data: workouts, isPending, isError, error } = useWorkouts();

    async function handleLogout() {
        try {
            await signOut();
        } catch (error) {
            console.error("Logout failed: ", error);
        }
    }

    if (isPending) {
        return <LoadingState title="Loading workout data" description="Please wait while we fetch your workout data" onAction={() => window.location.reload()} />
    }

    if (isError) {
        return <ErrorState title="Error loading workout data" description={error.message} icon={FiActivity} onAction={() => window.location.reload()} />
    }

    // if no session found navigate to login
    if (!session) {
        return <Navigate to="/login" replace />
    }

    return (
        <AppShell
            sidebar={<SideBar />}
            topbar={<TopBar handleLogout={handleLogout} />}
        >
            <PageHeader
                title="Dashboard"
                description={`Welcome back ${session?.user?.email}`}
            />

            <div className="mt-8">
                <p className="text-muted-fragmented">
                    Your have completed {workouts.length} workout(s).
                </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total workouts"
                    value={workouts.length}
                    description="No workouts yet"
                />
                <StatCard
                    title="Average Form"
                    value={workouts}
                    description="Start training to see you score"
                />
                <StatCard
                    title="Current streak"
                    value={workouts}
                    description="Keeep training"
                />
                <StatCard
                    title="Total reps"
                    // adding reps throughout all workout sessions
                    value={workouts.reduce((total, workout) => total + workout.total_reps, 0).toLocaleString()}
                    description="Across all workouts"
                />
            </div>

            <Section
                title="Recent Workouts"
                description="Your latest training sessions"
            >
                {workouts && workouts.length > 0 ? (
                    <div className="space-y-4">
                        {workouts.map((workout) => (
                            <WorkoutItem key={workout.id} workout={workout} />
                        ))}
                        <Link to="/workouts" className="block mt-4">
                            <Button className="w-full">
                                View all workouts
                                <ArrowRightIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <EmptyState
                        title="No Workouts yet"
                        description="Complete your first workout and your activity will appear here"
                        action={
                            <Button>
                                Start workout
                            </Button>
                        }
                    />
                )}
            </Section>
        </AppShell>

    )
}




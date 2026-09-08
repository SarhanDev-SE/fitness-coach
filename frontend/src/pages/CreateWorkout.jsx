import PageHeader from "@/components/common/PageHeader";
import AppShell from "@/components/layout/AppShell";
import { CardContent, CardHeader, CardTitle, Card } from "@/components/ui/card";
import WorkoutForm from "@/features/workouts/components/WorkoutForm";

export default function CreateWorkout() {
    return (
       <AppShell>
         <div className="space-y-8">
            <PageHeader
                title="Create Workout"
                description="Manually record a workout while the AI coaching system is under development"
            />
            <Card>
                <CardHeader>
                    <CardTitle>Workout details</CardTitle>
                </CardHeader>

                <CardContent>
                    <WorkoutForm />
                </CardContent>
            </Card>
        </div>
       </AppShell>
    )
}
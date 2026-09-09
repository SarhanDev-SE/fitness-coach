import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";


export function WorkoutItem({ workout }) {
    return (
        <Card key={workout.id}>
            <CardHeader>
                <CardTitle>{workout.exercise}</CardTitle>
                <CardDescription>{workout.date}</CardDescription>
            </CardHeader>
            <CardContent>
                <p>Reps: {workout.total_reps}</p>
                <p>Form Score: {workout.avg_form_score}</p>
                <p>Duration: {workout.hold_duration_seconds} seconds</p>
            </CardContent>
        </Card>
    )
}
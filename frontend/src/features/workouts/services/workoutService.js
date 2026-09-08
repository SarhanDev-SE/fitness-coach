import { supabase } from "@/lib/supabase";
import { workoutSchema } from "../schema/workoutSchema";

// for service/api boundaries we choose between parse() and safeParse()

export async function createWorkout(workoutData) {
    // if data is coming somewhere else not from WorkoutForm, we need to validate it
    const validatedWorkoutData = workoutSchema.parse(workoutData);
    // checking if authenticated user is trying to create workout
    const {
        data: { user },
        error: useError
    } = await supabase.auth.getUser(); //using supabase auth object to get current logged-in user

    if (useError) {
        throw useError;
    }
    if (!user) {
        throw new Error("You must be authenticated to create a workout");
    }

    const payload = {
        user_id: user.id,
        exercise: validatedWorkoutData.exercise,
        total_reps: validatedWorkoutData.totalReps,
        avg_form_score: validatedWorkoutData.avgFormScore,
        hold_duration_seconds: validatedWorkoutData.durationSeconds ?? validatedWorkoutData.holdDurationSeconds ?? null,
        completed_at: validatedWorkoutData.completedAt || new Date().toISOString(),
        status: validatedWorkoutData.status || "completed"
    };

    // this queries workouts table in supabase to insert a workout object
    const { data, error } = await supabase
        .from("workouts")
        .insert(payload)
        .select()
        .single();

    if (error) {
        throw error;
    }
    return data;
}
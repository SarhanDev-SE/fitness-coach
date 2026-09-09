import { supabase } from "@/lib/supabase";
import { workoutInputSchema, workoutsSchema, workoutSchema } from "../schema/workoutSchema";

// for service/api boundaries we choose between parse() and safeParse()

export async function createWorkout(workoutData) {
    // if data is coming somewhere else not from WorkoutForm, we need to validate it
    const validatedWorkoutData = workoutInputSchema.parse(workoutData);
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

export async function getWorkouts() {
    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }

    if (!user) {
        throw new Error("You must be authenticated!#")
    }

    const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("user_id", user.id)
        .order("started_at", {
            ascending: false
        });

    if (error) {
        throw error;
    }

    // the date we recieved is now parsed to check it validates zod schema
    return workoutsSchema.parse(data);
}

export async function getWorkout(id) {
    const {
        data: { user },
        error: userError
    } = await supabase.auth.getUser();

    if (userError) {
        throw userError;
    }

    if (!user) {
        throw new Error("You must be authenticated!#")
    }

    const { data, error } = await supabase
        .from("workouts")
        .select("*")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

    if (error) {
        throw error;
    }

    // the date we recieved is now parsed to check it validates zod schema
    return workoutSchema.parse(data);
}

export async function deleteWorkout(id) {
    const { error } = await supabase.from("workouts").delete().eq("id", id);
    if (error) {
        throw error;
    }
    return true;
}
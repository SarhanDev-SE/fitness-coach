import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWorkout, deleteWorkout as deleteWorkoutService } from "../services/workoutService";

export function useWorkout(id) {
    return useQuery({
        queryKey: ["workouts", id],
        queryFn: () => getWorkout(id),
        enabled: Boolean(id) // query only runs if id is truthy
    })
}


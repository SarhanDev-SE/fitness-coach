import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWorkout, deleteWorkout as deleteWorkoutService } from "../services/workoutService";

// Mutation hook to delete a workout
export function useDeleteWorkout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteWorkoutService,
        onSuccess: () => {
            // Invalidate and refetch the workouts list to update the UI
            queryClient.invalidateQueries({ queryKey: ["workouts"] });
        }
    });
}
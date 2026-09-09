import { useQuery } from "@tanstack/react-query";
import { getWorkouts } from "../services/workoutService";

export function useWorkouts() {
    // the benefit of useQuery is that it handles all the fetching loading and error states, without we manually handling server state, make ui interactions and calls safe and smooth
    return useQuery({
        queryKey: ["workouts"],
        queryFn: () => getWorkouts(),
    })
}
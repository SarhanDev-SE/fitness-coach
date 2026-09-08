import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { workoutSchema } from "../schema/workoutSchema"
import { createWorkout } from "../services/workoutService"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
export default function WorkoutForm() {
    const [success, setSuccess] = useState("");
    const [submitError, setSubmitError] = useState("");
    const navigate = useNavigate();
    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        resolver: zodResolver(workoutSchema),
        defaultValues: {
            exercise: "pushup",
            totalReps: 10,
            avgFormScore: 85,
            durationSeconds: 60,
            status: "completed"
        }
    });

    const onSubmit = async (data) => {
        try {
            setSubmitError("");
            setSuccess("");
            await createWorkout(data);
            setSuccess("Workout saved successfully.")
            reset();
            navigate("/dashboard")
        }
        catch (error) {
            console.error("Failed to create workout", error);
            setSubmitError(error.message || "Failed to create workout");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {success && (
                <div className="p-3 text-sm text-green-700 bg-green-50 rounded-lg border border-green-200 dark:bg-green-950/30 dark:text-green-400 dark:border-green-800">
                    {success}
                </div>
            )}
            {submitError && (
                <div className="p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200 dark:bg-red-950/30 dark:text-red-400 dark:border-red-800">
                    {submitError}
                </div>
            )}

            {/* Exercise Input */}
            <div>
                <Label htmlFor="exercise">Exercise</Label>
                <Controller
                    control={control}
                    name="exercise"
                    render={({ field }) => (
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger id="exercise" className="mt-1">
                                <SelectValue placeholder="Select an exercise" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pushup">Push-ups</SelectItem>
                                <SelectItem value="squat">Squats</SelectItem>
                                <SelectItem value="plank">Plank</SelectItem>
                                <SelectItem value="lunges">Lunges</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />

                {errors.exercise && (
                    <p className="text-red-500 text-sm mt-1">{errors.exercise.message}</p>
                )}
            </div>

            {/* Total Reps Input */}
            <div>
                <Label htmlFor="totalReps">Total Reps</Label>
                <Input
                    {...register("totalReps", { valueAsNumber: true })}
                    id="totalReps"
                    type="number"
                    min="1"
                    className="mt-1"
                />
                {errors.totalReps && (
                    <p className="text-red-500 text-sm mt-1">{errors.totalReps.message}</p>
                )}
            </div>

            {/* Avg Form Score Input */}
            <div>
                <Label htmlFor="avgFormScore">Average Form Score</Label>
                <Input
                    {...register("avgFormScore", { valueAsNumber: true })}
                    id="avgFormScore"
                    type="number"
                    min="0"
                    max="100"
                    className="mt-1"
                />
                {errors.avgFormScore && (
                    <p className="text-red-500 text-sm mt-1">{errors.avgFormScore.message}</p>
                )}
            </div>

            {/* Duration Seconds Input */}
            <div>
                <Label htmlFor="durationSeconds">Duration (seconds)</Label>
                <Input
                    {...register("durationSeconds", { valueAsNumber: true })}
                    id="durationSeconds"
                    type="number"
                    min="1"
                    className="mt-1"
                />
                {errors.durationSeconds && (
                    <p className="text-red-500 text-sm mt-1">{errors.durationSeconds.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
            >
                {isSubmitting ? "Logging Workout..." : "Log Workout"}
            </Button>
        </form>
    )
}
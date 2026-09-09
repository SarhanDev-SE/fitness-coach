import { z } from "zod";

//some fields would be asked during onboarding
//and others would be calculated from workout data
//fields asked during onboarding can be modified in profile section

export const profileSchema = z.object({
    id: z.string().uuid(),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    //  asked during onboarding
    age: z.number().positive("Age must be a positive number"),
    
    //optional fields from profiles table
    fitness_level: z.string().optional(),
    current_streak: z.number().optional(),
    fitness_goal: z.string().optional(),
    height_cm: z.number().positive("Height must be a positive number").optional(),
    weight_kg: z.number().positive("Weight must be a positive number").optional(),
    gender: z.string().optional(),
    daily_workout_goal: z.number().positive("Daily workout goal must be a positive number").optional(),
    avg_form_score: z.number().positive("Average form score must be a positive number").optional(),
    total_workout_completed: z.number().positive("Total workout completed must be a positive number").optional(),
    total_workout_time_seconds: z.number().positive("Total workout time must be a positive number").optional(),
    last_workout_date: z.string().optional(),
    last_completed_workout_date: z.string().optional(),
    last_streak_date: z.string().optional(),
    created_at: z.string().optional(),
    updated_at: z.string().optional(),
});
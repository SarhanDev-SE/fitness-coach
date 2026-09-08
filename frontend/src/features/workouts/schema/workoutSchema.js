import { z } from 'zod';

export const workoutSchema = z.object({
    exercise: z.enum(["squat", "pushup", "plank", "lunges"]),

    totalReps: z
        .number()
        .int()
        .min(1, "minimum reps is 1")
        .max(500, "maximum reps is 500"),

    avgFormScore: z
        .number()
        .int()
        .min(0, "minimum form score is 0")
        .max(100, "maximum form score is 100"),

    durationSeconds: z
        .number()
        .int()
        .min(1, "duration must be at least 1 second")
        .max(3600, "workout must be less than an hour")
        .default(60),

    completedAt: z
        .union([z.string(), z.date()])
        .optional()
        .transform((val) => (val ? new Date(val).toISOString() : new Date().toISOString())),

    status: z
        .enum(["active", "completed", "abandoned"])
        .default("completed"),

    date: z
        .union([z.string(), z.date()])
        .optional()
        .transform((val) => (val ? new Date(val).toISOString() : new Date().toISOString())),

    createdAt: z
        .union([z.string(), z.date()])
        .optional()
        .transform((val) => (val ? new Date(val).toISOString() : new Date().toISOString())),

    updatedAt: z
        .union([z.string(), z.date()])
        .optional()
        .transform((val) => (val ? new Date(val).toISOString() : new Date().toISOString())),
});
import { z } from "zod";

export const TaskSchema = z.object({
    title: z.string({
        required_error: "Title is required",
    }),
    description: z.string({
        required_error: "Description must be a string"
    }),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
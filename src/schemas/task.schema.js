import { z } from "zod";

export const TaskSchema = z.object({
    title: z.string({
        required_error: "Title is required",
    }),
    description: z.string({
        required_error: "Description is required",
    }),
    date: z.date({
        required_error: "Date is required",
    }),
});
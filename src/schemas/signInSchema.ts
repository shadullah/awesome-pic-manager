import { z } from "zod";


export const signInSchema = z.object({
    identifier: z.string(), // for email, calling it identifier because production uses
    password:z.string()
})
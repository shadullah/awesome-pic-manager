import { z } from "zod";


export const postSchema = z.object({
    caption: z.string().max(300, {message:"caption must not be longer than 300 characters!!"})
})
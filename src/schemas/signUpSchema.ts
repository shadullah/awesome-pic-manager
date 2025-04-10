import { z } from "zod";


export const fullnameValidation = z.string().min(2, "fullname must be more than 2 characters")

export const signUpSchema = z.object({
    fullname: fullnameValidation,
    email: z.string().email({message:'Invalid email address'}),
    password: z.string().min(6, {message: "password must contain 6 characters"})
})
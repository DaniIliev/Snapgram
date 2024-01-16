import * as z from "zod"


export const singUpValidationSchema = z.object({
    name: z.string().min(2,{message: 'Name muss be at least 2 characters'}),
    username: z.string().min(2, {message: 'Username muss be at least 2 characters'}),
    email: z.string().email(),
    password: z.string().min(8, {message: 'Password muss be at least 8 characters'})
  })
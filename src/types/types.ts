import { z } from 'zod';

export const noteSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  createdAt: z.number()
})

export type Note = z.infer<typeof noteSchema>;


export const registerSchema = z.object({
  username: z.string().min(3, {error: "Username must be at least 3 characters"}),
  firstname: z.string().min(3, {error: "First Name must be at least 3 characters"}),
  lastname: z.string().min(3, {error: "Last Name must be at least 3 characters"}),
  password: z.string()
        .min(6, {error: "Password must be at least 6 characters"})
        .regex(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/, {error: "Password must have at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces."}),
  // Password has a minimum of 6 characters, at least 1 uppercase letter, 1 lowercase letter and at least 1 number.
})

export type RegisterFields = z.infer<typeof registerSchema>

export const loginSchema = z.object({
  username: z.string({error: "Username is required"}),
  password: z.string({error: "Password is required"}),
})

export type LoginFields = z.infer<typeof loginSchema>

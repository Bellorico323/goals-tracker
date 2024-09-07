import z from 'zod'

export const userSchema = z.object({
  user: z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    createdAt: z.date(),
  }),
})

export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const responseLoginUserSuccessSchema = z.object({
  token: z.string(),
})

export const responseLoginUserFailureSchema = z.object({
  message: z.string(),
})

export const loginWithGoogleSchema = z.object({
  code: z.string(),
})

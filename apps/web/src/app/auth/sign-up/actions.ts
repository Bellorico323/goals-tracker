'use server'

import { z } from 'zod'

const signUpSchema = z
  .object({
    name: z.string().refine((value) => value.split(' ').length > 1, {
      message: 'Por favor, insira seu nome completo.',
    }),
    email: z
      .string()
      .email({ message: 'Por favor, insira um endereço de e-mail válido.' }),
    password: z
      .string()
      .min(6, { message: 'A senha tem que ter no mínimo 6 caracteres' }),
    password_confirmation: z
      .string()
      .min(6, { message: 'Password should have at least 6 characters' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Confirmação de senha incorreta.',
    path: ['password_confirmation'],
  })

export async function signUpAction(data: FormData) {
  console.log(data)

  const formData = signUpSchema.safeParse(Object.fromEntries(data))

  return 'success'
}

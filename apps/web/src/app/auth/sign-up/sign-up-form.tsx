'use client'

import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { signUpAction } from './actions'

export function SignUpForm() {
  const router = useRouter()

  const [{ errors }, handleSubmit, isPending] = useFormState(
    signUpAction,
    () => {
      router.push('/auth/sign-in')
    },
  )

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-2">
      <div className="space-y-1">
        <Label htmlFor="name">Nome Completo</Label>
        <Input placeholder="Digite seu nome completo" id="name" name="name" />

        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input placeholder="Digite seu e-mail" id="email" name="email" />

        {errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Senha</Label>
        <Input
          placeholder="Digite sua senha"
          type="password"
          id="password"
          name="password"
        />

        {errors?.password && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password[0]}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="password_confirmation">Confirmar senha</Label>
        <Input
          placeholder="Digite sua senha novamente"
          type="password"
          id="password_confirmation"
          name="password_confirmation"
        />

        {errors?.password_confirmation && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.password_confirmation[0]}
          </p>
        )}
      </div>

      <Button className="w-full" variant="primary" disabled={isPending}>
        {isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          'Se cadastrar'
        )}
      </Button>

      <Button variant="link" className="w-full" asChild size="sm">
        <Link href="/auth/sign-in">Já possui uma conta? Clique aqui</Link>
      </Button>
    </form>
  )
}

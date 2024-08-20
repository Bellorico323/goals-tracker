'use client'

import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithEmailAndPassword } from './actions'

export function SignInForm() {
  const redirect = useRouter()

  const [{ errors }, handleSubmit, isPending] = useFormState(
    signInWithEmailAndPassword,
    () => redirect.push('/'),
  )

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input placeholder="Digite seu e-mail" id="email" name="email" />

        {errors?.email && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.email[0]}
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="inline-flex w-full items-baseline justify-between">
          <Label htmlFor="password">Senha</Label>
          <Link
            href="/"
            className="text-center text-sm text-gold-800 hover:underline"
          >
            Esqueci minha senha
          </Link>
        </div>
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

      <Button
        className="w-full"
        variant="primary"
        type="submit"
        disabled={isPending}
      >
        {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Entrar'}
      </Button>

      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-up">Criar nova conta</Link>
      </Button>
    </form>
  )
}

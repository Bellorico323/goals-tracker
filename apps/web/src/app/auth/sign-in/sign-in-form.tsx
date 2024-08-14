import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignInForm() {
  return (
    <form action="" className="w-full space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="email">E-mail</Label>
        <Input placeholder="Digite seu e-mail" id="email" />
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
        <Input placeholder="Digite sua senha" type="password" id="password" />
      </div>

      <Button className="w-full" variant="primary">
        Entrar
      </Button>

      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-up">Criar nova conta</Link>
      </Button>
    </form>
  )
}

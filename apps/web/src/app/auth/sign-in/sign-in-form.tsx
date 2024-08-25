import Image from 'next/image'
import Link from 'next/link'

import googleLogo from '@/assets/googleLogo.svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { signInWithGoogle } from '../actions'

export function SignInForm() {
  return (
    <div className="w-full space-y-4">
      <form action="" className="w-full space-y-3">
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
      </form>

      <form action={signInWithGoogle}>
        <Button type="submit" className="w-full" variant="outline">
          <Image src={googleLogo} alt="" className="mr-2 size-6 dark:invert" />
          Entrar com Google
        </Button>
      </form>

      <Button variant="link" className="w-full" size="sm" asChild>
        <Link href="/auth/sign-up">Criar nova conta</Link>
      </Button>
    </div>
  )
}

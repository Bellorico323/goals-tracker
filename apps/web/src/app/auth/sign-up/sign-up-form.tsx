import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function SignUpForm() {
  return (
    <form action="" className="w-full space-y-2">
      <div className="space-y-1">
        <Label htmlFor="name">Nome Completo</Label>
        <Input placeholder="Digite seu nome completo" id="name" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="email">E-mail</Label>
        <Input placeholder="Digite seu e-mail" id="email" />
      </div>

      <div className="space-y-1">
        <Label htmlFor="password">Senha</Label>
        <Input placeholder="Digite sua senha" type="password" id="password" />
      </div>

      {/* <div className="space-y-1">
        <Label htmlFor="confirm-password">Confirmar senha</Label>
        <Input
          placeholder="Digite sua senha novamente"
          type="password"
          id="confirm-password"
        />
      </div> */}

      <Button className="w-full" variant="primary">
        Se cadastrar
      </Button>

      <Button variant="link" className="w-full" asChild size="sm">
        <Link href="/auth/sign-in">Já possui uma conta? Clique aqui</Link>
      </Button>
    </form>
  )
}

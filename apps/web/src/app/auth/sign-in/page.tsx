import { Separator } from '@/components/ui/separator'

import { SignInForm } from './sign-in-form'

export default function SignInPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-96 flex-col items-center justify-center space-y-5">
        <h1 className="text-2xl font-semibold text-gold-500">Bem vindo!</h1>
        <p className="text-center text-muted-foreground">
          Coloque suas informações abaixo para entrar no ambiente da plataforma.
        </p>

        <Separator />

        <SignInForm />
      </div>
    </div>
  )
}

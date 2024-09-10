import { Separator } from '@/components/ui/separator'

import { SignUpForm } from './sign-up-form'

export default function SignUpPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-96 flex-col items-center justify-center space-y-5">
        <h1 className="text-2xl font-semibold text-gold-500">
          Criar nova conta!
        </h1>
        <p className="text-center text-muted-foreground">
          Preencha suas informações abaixo para se cadastrar na plataforma.
        </p>

        <Separator />

        <SignUpForm />
      </div>
    </div>
  )
}

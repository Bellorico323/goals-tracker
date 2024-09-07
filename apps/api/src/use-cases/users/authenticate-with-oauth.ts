import { User } from '@prisma/client'
import { UsersRepository } from 'src/repositories/users-repository'

import { InvalidCredentialsError } from './errors/invalid-credentials-error'

interface AuthenticateWithOAuthUseCaseRequest {
  email: string
}

interface AuthenticateWithOAuthUseCaseResponse {
  user: User
}

export class AuthenticateWithOAuthUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: AuthenticateWithOAuthUseCaseRequest): Promise<AuthenticateWithOAuthUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}

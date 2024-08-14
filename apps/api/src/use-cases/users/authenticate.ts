import { User } from '@prisma/client'
import { compare } from 'bcryptjs'


import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}

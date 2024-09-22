import { User } from '@prisma/client'
import { UsersRepository } from 'src/repositories/users-repository'

import { AccountRepository } from '@/repositories/account-repository'

interface AuthenticateWithOAuthUseCaseRequest {
  name: string
  email: string
  avatarUrl: string
  providerAccountId: string
}

interface AuthenticateWithOAuthUseCaseResponse {
  user: User
}

export class AuthenticateWithOAuthUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private accountsRepository: AccountRepository,
  ) {}

  async execute({
    email,
    name,
    avatarUrl,
    providerAccountId,
  }: AuthenticateWithOAuthUseCaseRequest): Promise<AuthenticateWithOAuthUseCaseResponse> {
    let user = await this.usersRepository.findByEmail(email)

    if (!user) {
      user = await this.usersRepository.create({
        name,
        email,
        avatarUrl,
      })
    }

    const account = await this.accountsRepository.findGoogleAccountByUserId(
      user.id,
    )

    if (!account) {
      await this.accountsRepository.create({
        provider: 'GOOGLE',
        providerAccountId,
        userId: user.id,
      })
    }

    return {
      user,
    }
  }
}

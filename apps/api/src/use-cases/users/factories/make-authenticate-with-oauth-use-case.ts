import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository'

import { PrismaAccountsRepository } from '@/repositories/prisma/prisma-accounts-repository'

import { AuthenticateWithOAuthUseCase } from '../authenticate-with-oauth'

export function makeAuthenticateWithGoogleUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const accountsRepository = new PrismaAccountsRepository()
  const authenticaWithOAuthteUseCase = new AuthenticateWithOAuthUseCase(
    usersRepository,
    accountsRepository,
  )

  return authenticaWithOAuthteUseCase
}

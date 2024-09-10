import { PrismaUsersRepository } from 'src/repositories/prisma/prisma-users-repository'

import { AuthenticateWithOAuthUseCase } from '../authenticate-with-oauth'

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticaWithOAuthteUseCase = new AuthenticateWithOAuthUseCase(
    usersRepository,
  )

  return authenticaWithOAuthteUseCase
}

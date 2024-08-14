/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from '@prisma/client'
import { hash } from 'bcryptjs'


import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  private ROUND_HASH = 6
  // eslint-disable-next-line no-useless-constructor
  constructor(private usersRepository: PrismaUsersRepository) {}

  async execute({
    password,
    name,
    email,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, this.ROUND_HASH)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
    })

    return { user }
  }
}

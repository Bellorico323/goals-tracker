/* eslint-disable @typescript-eslint/no-explicit-any */

import { hash } from 'bcryptjs'
import { User, UsersRepository } from 'src/repositories/users-repository'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'

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
  constructor(private usersRepository: UsersRepository) {}

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

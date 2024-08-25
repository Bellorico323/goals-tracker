import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { AuthenticateWithOAuthUseCase } from './authenticate-with-oauth'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateWithOAuthUseCase

describe('Authenticate with oAuth Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateWithOAuthUseCase(usersRepository)
  })

  it('should  be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'johndoe@example.com',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

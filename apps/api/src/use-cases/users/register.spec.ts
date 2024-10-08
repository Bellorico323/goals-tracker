import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'

import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345',
    })

    const isPasswordCorrectlyHashed = await compare('12345', user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'johndoe@xample.com'

    await sut.execute({
      name: 'John Doe',
      email,
      password: '12345',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email,
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should  be able to register', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@xample.com',
      password: '12345',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})

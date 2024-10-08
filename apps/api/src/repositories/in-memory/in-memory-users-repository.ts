import { randomUUID } from 'node:crypto'

import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from '../users-repository'



export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      avatarUrl: data.avatarUrl ?? null,
      password: data.password ?? null,
      createdAt: new Date(),
    }

    this.items.push(user)

    return user
  }
}

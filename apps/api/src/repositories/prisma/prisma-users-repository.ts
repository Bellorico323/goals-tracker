import { Prisma } from '@prisma/client'
import { prisma } from 'src/lib/prisma'

import { IUsersRepository } from '../users-repository'

export class PrismaUsersRepository implements IUsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    
    return user
  }
}

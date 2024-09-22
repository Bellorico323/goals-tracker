import { Account, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { AccountRepository } from '../account-repository'

export class PrismaAccountsRepository implements AccountRepository {
  async findGoogleAccountByUserId(userId: string): Promise<Account | null> {
    const account = await prisma.account.findUnique({
      where: {
        provider_userId: {
          provider: 'GOOGLE',
          userId,
        },
      },
    })

    if (!account) {
      return null
    }

    return account
  }

  async create(data: Prisma.AccountUncheckedCreateInput): Promise<void> {
    await prisma.account.create({
      data,
    })
  }
}

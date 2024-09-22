import { Account, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

import { AccountRepository } from '../account-repository'

export class InMemoryAccountsRepository implements AccountRepository {
  public items: Account[] = []

  async findGoogleAccountByUserId(userId: string): Promise<Account | null> {
    const account = this.items.find(
      (item) => item.userId === userId && item.provider === 'GOOGLE',
    )

    if (!account) {
      return null
    }

    return account
  }

  async create(data: Prisma.AccountUncheckedCreateInput): Promise<void> {
    this.items.push({
      id: randomUUID(),
      provider: data.provider,
      userId: data.userId,
      providerAccountId: data.providerAccountId,
    })
  }
}

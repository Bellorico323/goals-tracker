import { Account, Prisma } from '@prisma/client'

export interface AccountRepository {
  findGoogleAccountByUserId(userId: string): Promise<Account | null>
  create(data: Prisma.AccountUncheckedCreateInput): Promise<void>
}

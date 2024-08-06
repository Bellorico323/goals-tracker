import { users } from 'src/db/schema'

export type User = typeof users.$inferInsert

export interface UsersRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(data: User): Promise<User>
}

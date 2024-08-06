import { db } from 'src/db/connection'
import { users } from 'src/db/schema'

import { User, UsersRepository } from '../users-repository'

export class DrizzleUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, id)
      },
    })

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    try {
      const user = await db.query.users.findFirst({
        where(fields, { eq }) {
          return eq(fields.email, email)
        },
      })

      if (!user) {
        return null
      }

      return user
    } catch (error) {
      console.error('Error fetching user by email:', error)
      throw error
    }
  }

  async create(data: User) {
    try {
      const user = await db.insert(users).values(data)

      return user[0]
    } catch (error) {
      console.log('Error creating user:', error)
      throw error
    }
  }
}

import { Category, Prisma } from '@prisma/client'

export interface ICategoryRepository {
  findById(id: string): Promise<Category | null>
  listByUserId(userId: string): Promise<Category[]>
  create(data: ICreateUpdateInput): Promise<Category>
  findByName(userId: string, name: string): Promise<Category | null>
  update(id: string, data: ICreateUpdateInput): Promise<Category>
  delete(id: string): Promise<void>
}


export interface ICreateUpdateInput {
  id?: string
  name: string
  description: string
  userId: string
}

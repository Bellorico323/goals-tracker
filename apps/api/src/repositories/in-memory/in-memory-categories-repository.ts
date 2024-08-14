import { Category, Prisma } from '@prisma/client'
import { ICategoryRepository } from '../category-repository'
import { randomUUID } from 'crypto'

export class InMemoryCategoryRepository implements ICategoryRepository {
  public items: Category[] = []

  async create(data: any): Promise<Category> {
    const category = {
      id: randomUUID(),
      name: data.name,
      description: data.description,
      userId: data.userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.items.push(category)

    return category
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id === id)

    if (index === -1) {
      throw new Error('Category not found')
    }

    this.items.splice(index, 1)
  }

  async findById(id: string): Promise<Category | null> {
    const category = this.items.find((item) => item.id === id)

    if (!category) {
      return null
    }

    return category
  }

  async findByName(userId: string, name: string): Promise<Category | null> {
    const category = this.items.find(
      (item) => item.userId === userId && item.name === name
    )

    if (!category) {
      return null
    }

    return category
  }

  async listByUserId(userId: string): Promise<Category[]> {
    const categories = this.items.filter((item) => item.userId === userId)

    return categories
  }

  async update(id: string, data: any): Promise<Category> {
    const index = this.items.findIndex((item) => item.id === id)

    if (index === -1) {
      throw new Error('Category not found')
    }

    const category = this.items[index]

    this.items[index] = {
      ...category,
      ...data,
      updatedAt: new Date(),
    }

    return this.items[index]
  }
}

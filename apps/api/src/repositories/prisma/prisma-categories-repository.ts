import { Category } from '@prisma/client'
import { ICategoryRepository, ICreateUpdateInput } from '../category-repository'
import { prisma } from '@/lib/prisma'

export class PrismaCategoryRepository implements ICategoryRepository {
  async create(data: ICreateUpdateInput): Promise<Category> {
    const category = await prisma.category.create({
      data,
    })

    return category
  }

  async delete(id: string): Promise<void> {
    const findCategory = prisma.category.findUnique({
      where: {
        id,
      },
    })

    if (!findCategory) {
      throw new Error('Category not found')
    }

    await prisma.category.delete({
      where: {
        id,
      },
    })
  }

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: {
        id,
      },
    })

    if (!category) {
      return null
    }

    return category
  }

  async findByName(userId: string, name: string): Promise<Category | null> {
    const category = await prisma.category.findFirst({
      where: {
        userId,
        name,
      },
    })

    if (!category) {
      return null
    }

    return category
  }

  async listByUserId(userId: string): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      where: {
        userId,
      },
    })

    return categories
  }

  async update(id: string, data: ICreateUpdateInput): Promise<Category> {
    const category = await prisma.category.update({
      where: {
        id,
      },
      data,
    })

    return category
  }
}

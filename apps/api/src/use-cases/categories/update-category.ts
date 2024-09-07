import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-categories-repository'
import { CategoryNotFoundError } from './errors/category-not-found-error'
import { ICreateUpdateInput } from '@/repositories/category-repository'
import { Category } from '@prisma/client'

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: PrismaCategoryRepository) {}

  async execute({
    description,
    name,
    userId,
    id,
  }: ICreateUpdateInput): Promise<Category> {
    const categoryId = id || ''
    const category = await this.categoryRepository.findById(categoryId)

    if (!category) {
      throw new CategoryNotFoundError()
    }

    const updatedCategory = await this.categoryRepository.update(categoryId, {
      description,
      name,
      userId,
    })

    return updatedCategory
  }
}

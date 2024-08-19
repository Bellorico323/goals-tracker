import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-categories-repository'
import { CategoryNotFoundError } from './errors/category-not-found-error'
import { ICreateUpdateInput } from '@/repositories/category-repository'
import { Category } from '@prisma/client'

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: PrismaCategoryRepository) {}

  async execute(id: string, data: ICreateUpdateInput): Promise<Category> {
    const category = await this.categoryRepository.findById(id)

    if (!category) {
      throw new CategoryNotFoundError()
    }

    const updatedCategory = await this.categoryRepository.update(id, data)

    return updatedCategory
  }
}

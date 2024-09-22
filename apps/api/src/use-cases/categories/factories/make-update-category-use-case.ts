import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-categories-repository'
import { UpdateCategoryUseCase } from '../update-category'

export function makeUpdateCategoryUseCase() {
  const categoryRepository = new PrismaCategoryRepository()
  const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository)

  return updateCategoryUseCase
}

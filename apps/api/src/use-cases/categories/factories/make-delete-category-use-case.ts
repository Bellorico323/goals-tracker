import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-categories-repository'
import { DeleteCategoryUseCase } from '../delete-category'

export function makeDeleteCategoryUseCase() {
  const categoryRepository = new PrismaCategoryRepository()
  const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository)

  return deleteCategoryUseCase
}

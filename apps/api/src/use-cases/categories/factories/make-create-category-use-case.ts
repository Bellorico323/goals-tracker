import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-categories-repository'
import { CreateCategoryUseCase } from '../create-category'

export function makeCreateCategoryUseCase() {
  const categoryRepository = new PrismaCategoryRepository()
  const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)

  return createCategoryUseCase
}

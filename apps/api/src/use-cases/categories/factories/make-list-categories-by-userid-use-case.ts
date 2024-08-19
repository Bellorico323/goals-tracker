import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-categories-repository'
import { ListCategoriesByUserIdUseCase } from '../list-categories-by-userid'

export function makeListCategoriesByUserIdUseCase() {
  const categoryRepository = new PrismaCategoryRepository()
  const listCategoriesByUserIdUseCase = new ListCategoriesByUserIdUseCase(
    categoryRepository
  )

  return listCategoriesByUserIdUseCase
}

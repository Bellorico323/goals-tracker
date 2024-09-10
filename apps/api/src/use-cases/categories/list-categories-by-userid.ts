import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-categories-repository'
import { Category } from '@prisma/client'

interface ListCategoriesByUserIdUseCaseRequest {
  userId: string
}

export class ListCategoriesByUserIdUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private categoryRepository: PrismaCategoryRepository) {}

  async execute({
    userId,
  }: ListCategoriesByUserIdUseCaseRequest): Promise<Category[]> {
    const categories = await this.categoryRepository.listByUserId(userId)

    return categories
  }
}

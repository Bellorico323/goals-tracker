import { PrismaCategoryRepository } from '@/repositories/prisma/prisma-categories-repository'
import { Category } from '@prisma/client'
import { CategoryAlreadyExistsError } from './errors/category-already-exists-error'

interface CreateCategoryUseCaseRequest {
  name: string
  description: string
  userId: string
}

interface CreateCategoryUseCaseResponse {
  name: string
  description: string
}

export class CreateCategoryUseCase {
  // eslint-disable-next-line no-useless-constructor
  constructor(private categoryRepository: PrismaCategoryRepository) {}

  async execute({
    name,
    description,
    userId,
  }: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(
      userId,
      name
    )

    if (categoryAlreadyExists) {
      throw new CategoryAlreadyExistsError()
    }

    const category = await this.categoryRepository.create({
      name,
      description,
      userId,
    })

    return category
  }
}

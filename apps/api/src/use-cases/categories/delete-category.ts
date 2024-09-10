import { ICategoryRepository } from '@/repositories/category-repository'
import { CategoryNotFoundError } from './errors/category-not-found-error'

interface DeleteCategoryUseCaseRequest {
  id: string
}

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute({ id }: DeleteCategoryUseCaseRequest): Promise<void> {
    const findCategory = await this.categoryRepository.findById(id)

    if (!findCategory) {
      throw new CategoryNotFoundError()
    }

    await this.categoryRepository.delete(id)
  }
}

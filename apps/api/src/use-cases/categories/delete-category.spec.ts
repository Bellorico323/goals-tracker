import { InMemoryCategoryRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { DeleteCategoryUseCase } from './delete-category'

let categoryRepository: InMemoryCategoryRepository
let sut: DeleteCategoryUseCase

describe('Delete Category Use Case', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository()
    sut = new DeleteCategoryUseCase(categoryRepository)
  })

  it('should be able to delete a category', async () => {
    const category = await categoryRepository.create({
      name: 'Category Name',
      description: 'Category Description',
      userId: 'user-id',
    })

    await sut.execute({
      id: category.id,
    })

    const findCategory = await categoryRepository.findById(category.id)

    expect(findCategory).toBeNull()
  })
})

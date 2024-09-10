import { InMemoryCategoryRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { UpdateCategoryUseCase } from './update-category'

let categoryRepository: InMemoryCategoryRepository
let sut: UpdateCategoryUseCase

describe('Update Category Use Case', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository()
    sut = new UpdateCategoryUseCase(categoryRepository)
  })

  it('should be able to update a category', async () => {
    const category = await categoryRepository.create({
      name: 'Category Name',
      description: 'Category Description',
      userId: 'user-id',
    })

    const updatedCategory = await sut.execute({
      name: 'New Category Name',
      description: 'New Category Description',
      userId: 'user-id',
      id: category.id,
    })
    expect(updatedCategory.id).toEqual(category.id)
    expect(updatedCategory.name).toEqual('New Category Name')
    expect(updatedCategory.description).toEqual('New Category Description')
  })
})

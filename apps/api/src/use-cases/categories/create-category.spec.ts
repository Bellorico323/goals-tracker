import { InMemoryCategoryRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { CreateCategoryUseCase } from './create-category'

let categoryRepository: InMemoryCategoryRepository
let sut: CreateCategoryUseCase

describe('Create Category Use Case', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository()
    sut = new CreateCategoryUseCase(categoryRepository)
  })

  it('should be able to create category', async () => {
    const { category } = await sut.execute({
      name: 'Category Name',
      description: 'Category Description',
      userId: 'user-id',
    })

    expect(category.id).toEqual(expect.any(String))
  })
})

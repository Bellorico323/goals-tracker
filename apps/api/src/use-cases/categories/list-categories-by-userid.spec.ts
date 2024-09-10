import { InMemoryCategoryRepository } from '@/repositories/in-memory/in-memory-categories-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { ListCategoriesByUserIdUseCase } from './list-categories-by-userid'

let categoryRepository: InMemoryCategoryRepository
let sut: ListCategoriesByUserIdUseCase

describe('List Categories Use Case', () => {
  beforeEach(() => {
    categoryRepository = new InMemoryCategoryRepository()
    sut = new ListCategoriesByUserIdUseCase(categoryRepository)
  })

  it('should be able to list categories by user id', async () => {
    for (let i = 0; i < 3; i++) {
      await categoryRepository.create({
        name: `Category Name ${i}`,
        description: `Category Description ${i}`,
        userId: 'user-id',
      })
    }

    const categories = await sut.execute({
      userId: 'user-id',
    })

    expect(categories.length).toEqual(3)
  })
})

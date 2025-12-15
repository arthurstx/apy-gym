import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository.js'
import { FetchUserCheckInHistoryUseCase } from './fetch-user-check-ins-history.js'

let CheckInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInHistoryUseCase

describe('Fetch user check-in history use case', () => {
  beforeEach(() => {
    CheckInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInHistoryUseCase(CheckInsRepository)
  })

  it('Should be able to fetch check-in history', async () => {
    await CheckInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await CheckInsRepository.create({
      gymId: 'gym-02',
      userId: 'user-01',
    })

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-01' }),
      expect.objectContaining({ gymId: 'gym-02' }),
    ])
  })
  it('Should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await CheckInsRepository.create({
        gymId: `gym-${i}`,
        userId: 'user-01',
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gymId: 'gym-21' }),
      expect.objectContaining({ gymId: 'gym-22' }),
    ])
  })
})

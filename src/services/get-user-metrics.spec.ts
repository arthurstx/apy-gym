import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository.js'
import { GetUserMetricsUseCase } from './get-user-metrics.js'

let CheckInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe('Get user metrics use case', () => {
  beforeEach(() => {
    CheckInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(CheckInsRepository)
  })

  it('Should be able to get check-ins count from metrics', async () => {
    await CheckInsRepository.create({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await CheckInsRepository.create({
      gymId: 'gym-02',
      userId: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})

import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository.js'
import { CheckInUseCase } from './check-In.js'

let CheckInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in use case', () => {
  beforeEach(() => {
    CheckInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(CheckInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 0, 8))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await expect(
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('Should be able to check in but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 1, 8))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })
    vi.setSystemTime(new Date(2022, 0, 2, 8))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})

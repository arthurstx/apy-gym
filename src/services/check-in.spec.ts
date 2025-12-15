import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository.js'
import { CheckInUseCase } from './check-In.js'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository.js'

let CheckInsRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    CheckInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(CheckInsRepository, gymsRepository)

    gymsRepository.create({
      id: 'gym-01',
      title: 'js gym',
      description: '',
      phone: '',
      latitude: -12.949499,
      longitude: -38.480654,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -12.949499,
      userLongitude: -38.480654,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2022, 0, 0, 8))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -12.949499,
      userLongitude: -38.480654,
    })

    await expect(
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -12.949499,
        userLongitude: -38.480654,
      })
    ).rejects.toBeInstanceOf(Error)
  })

  it('Should be able to check in but in different days', async () => {
    vi.setSystemTime(new Date(2022, 0, 1, 8))

    await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -12.949499,
      userLongitude: -38.480654,
    })
    vi.setSystemTime(new Date(2022, 0, 2, 8))

    const { checkIn } = await sut.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: -12.949499,
      userLongitude: -38.480654,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  it('Should not be able to check in on distant gym', async () => {
    expect(
      sut.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: -12.9591835,
        userLongitude: -38.4867537,
      })
    ).rejects.toBeInstanceOf(Error)
  })
})

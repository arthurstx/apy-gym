import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository.js'
import { FetchNearbyUseCase } from './fetch-nearby-gyms.js'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyUseCase

describe('Fetch nearby use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyUseCase(gymsRepository)
  })

  it('Should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      title: 'near gym',
      description: '',
      phone: '',
      latitude: -12.949499,
      longitude: -38.480654,
    })

    await gymsRepository.create({
      id: 'gym-02',
      title: 'far gym',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    const { gyms } = await sut.execute({
      userLatitude: -12.949499,
      userLongitude: -38.480654,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'near gym' })])
  })
})

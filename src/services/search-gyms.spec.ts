import { describe, it, expect, beforeEach } from 'vitest'
import { SearchGymsUseCase } from './search-gyms.js'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository.js'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search gyms use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('Should be able to Should be able to search gyms', async () => {
    await gymsRepository.create({
      id: 'gym-01',
      title: 'js gym',
      description: '',
      phone: '',
      latitude: -12.949499,
      longitude: -38.480654,
    })

    await gymsRepository.create({
      id: 'gym-02',
      title: 'ts gym',
      description: '',
      phone: '',
      latitude: -12.949499,
      longitude: -38.480654,
    })

    const { gyms } = await sut.execute({
      query: 'gym',
      page: 1,
    })

    expect(gyms).toEqual([
      expect.objectContaining({ title: 'js gym' }),
      expect.objectContaining({ title: 'ts gym' }),
    ])
  })
  it('Should be able to search pagineted gyms', async () => {
    for (let i = 0; i <= 21; i++) {
      await gymsRepository.create({
        id: `gym-${i}`,
        title: `js gym-${i}`,
        description: '',
        phone: '',
        latitude: -12.949499,
        longitude: -38.480654,
      })
    }

    const { gyms } = await sut.execute({
      query: 'gym',
      page: 2,
    })

    expect(gyms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ title: 'js gym-20' }),
        expect.objectContaining({ title: 'js gym-21' }),
      ])
    )
  })
})

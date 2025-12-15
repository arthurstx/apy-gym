import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '../repositories/in-memory/in-memory-gyms-repository.js'
import { GymUseCase } from './create-gym.js'

let gymsRepository: InMemoryGymsRepository
let sut: GymUseCase

describe('gym use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new GymUseCase(gymsRepository)
  })

  it('Should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'js gym',
      description: '',
      phone: '',
      latitude: 0,
      longitude: 0,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})

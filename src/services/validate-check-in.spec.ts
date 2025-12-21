import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '../repositories/in-memory/in-memory-check-ins-repository.js'
import { ValidateCheckInUseCase } from './validate-check-in.js'
import { ResourceNotFound } from './errors/resource-not-found-error.js'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error.js'

let CheckInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Check-in is validated use case', () => {
  beforeEach(() => {
    CheckInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(CheckInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('Should be able to validate check-in', async () => {
    const id = 'checkInId'

    await CheckInsRepository.create({
      id,
      gymId: 'gym-01',
      userId: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: id,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should be able to save check in', async () => {
    const id = 'checkInId'
    CheckInsRepository.create({
      id,
      gymId: 'gym-01',
      userId: 'user-01',
    })

    const { checkIn } = await sut.execute({ checkInId: id })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })

  it('Should not be able to validated check in', async () => {
    CheckInsRepository.create({
      id: 'id-01',
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await expect(
      sut.execute({
        checkInId: 'incorrect id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })

  it('Should not be able to validate check in after 20 minutes of its creation', async () => {
    const id = 'checkInId'

    vi.setSystemTime(new Date(2022, 1, 1, 10, 20))

    await CheckInsRepository.create({
      id,
      gymId: 'gym-01',
      userId: 'user-01',
    })

    vi.setSystemTime(new Date(2022, 1, 1, 10, 41))

    await expect(sut.execute({ checkInId: id })).rejects.toBeInstanceOf(
      LateCheckInValidationError
    )
  })
})

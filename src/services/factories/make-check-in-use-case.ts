import { PrismaCheckInRepository } from '../../repositories/prisma/prisma-check-in-repository.js'
import { CheckInUseCase } from '../check-In.js'
import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms-repository.js'

export function makeCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInRepository()
  const prismaGymsRepository = new PrismaGymsRepository()
  const checkInUseCase = new CheckInUseCase(
    prismaCheckInsRepository,
    prismaGymsRepository
  )

  return checkInUseCase
}

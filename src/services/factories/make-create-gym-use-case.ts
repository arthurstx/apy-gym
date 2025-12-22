import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms-repository.js'
import { GymUseCase } from '../create-gym.js'

export function makeCreateGymUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const gymUseCase = new GymUseCase(prismaGymsRepository)

  return gymUseCase
}

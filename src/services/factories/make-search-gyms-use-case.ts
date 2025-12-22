import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms-repository.js'
import { SearchGymsUseCase } from '../search-gyms.js'

export function makeSearchGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const searchGymsUseCase = new SearchGymsUseCase(prismaGymsRepository)

  return searchGymsUseCase
}

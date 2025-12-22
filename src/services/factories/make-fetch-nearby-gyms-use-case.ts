import { PrismaGymsRepository } from '../../repositories/prisma/prisma-gyms-repository.js'
import { FetchNearbyUseCase } from '../fetch-nearby-gyms.js'

export function makeFetchNearbyGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()
  const fetchNearbyGymsUseCase = new FetchNearbyUseCase(prismaGymsRepository)

  return fetchNearbyGymsUseCase
}

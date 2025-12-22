import { PrismaCheckInRepository } from '../../repositories/prisma/prisma-check-in-repository.js'
import { FetchUserCheckInHistoryUseCase } from '../fetch-user-check-ins-history.js'

export function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInRepository()
  const fetchUserCheckInsHistoryUseCase = new FetchUserCheckInHistoryUseCase(
    prismaCheckInsRepository
  )

  return fetchUserCheckInsHistoryUseCase
}

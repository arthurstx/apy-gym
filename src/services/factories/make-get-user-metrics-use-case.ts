import { PrismaCheckInRepository } from '../../repositories/prisma/prisma-check-in-repository.js'
import { GetUserMetricsUseCase } from '../get-user-metrics.js'

export function makeGetUserMetricsUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(
    prismaCheckInsRepository
  )

  return getUserMetricsUseCase
}

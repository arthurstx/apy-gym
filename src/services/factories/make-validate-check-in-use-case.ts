import { PrismaCheckInRepository } from '../../repositories/prisma/prisma-check-in-repository.js'
import { ValidateCheckInUseCase } from '../validate-check-in.js'

export function makeValidateCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInRepository()
  const validateCheckInUseCase = new ValidateCheckInUseCase(
    prismaCheckInsRepository
  )

  return validateCheckInUseCase
}

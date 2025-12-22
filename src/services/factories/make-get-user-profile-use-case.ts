import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository.js'
import { GetUserPorfileUseCase } from '../get-user-porfile.js'

export function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserPorfileUseCase(prismaUsersRepository)

  return getUserProfileUseCase
}

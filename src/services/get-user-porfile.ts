import type { User } from '../generated/prisma/client.js'
import type { UsersRepository } from '../repositories/users-repository.js'
import { ResourceNotFound } from './errors/resource-not-found-error.js'

interface GetUserPorfileUseCaseRequest {
  userId: string
}

interface GetUserPorfileUseCaseResponse {
  user: User
}

export class GetUserPorfileUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    userId,
  }: GetUserPorfileUseCaseRequest): Promise<GetUserPorfileUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFound()
    }

    return { user }
  }
}

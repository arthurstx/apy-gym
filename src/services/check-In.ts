import type { CheckIn } from '../generated/prisma/client.js'
import type { CheckInsRepository } from '../repositories/check-ins-repository.js'

interface CheckInUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    gymId,
    userId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkIn = await this.checkInRepository.create({ gymId, userId })

    return { checkIn }
  }
}

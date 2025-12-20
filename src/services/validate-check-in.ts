import type { CheckIn } from '../generated/prisma/client.js'
import type { CheckInsRepository } from '../repositories/check-ins-repository.js'
import { ResourceNotFound } from './errors/resource-not-found-error.js'

interface ValidateCheckInRequest {
  checkInId: string
}

interface ValidateCheckInResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInRequest): Promise<ValidateCheckInResponse> {
    const checkIn = await this.checkInRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFound()
    }

    checkIn.validated_at = new Date()

    await this.checkInRepository.save(checkIn)

    return { checkIn }
  }
}

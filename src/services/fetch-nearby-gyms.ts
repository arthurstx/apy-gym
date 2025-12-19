import type { Gym } from '../generated/prisma/client.js'
import type { GymsRepository } from '../repositories/gym-repository.js'

interface FeatchNearbyUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FeatchNearbyUseCaseResponse {
  gyms: Gym[]
}

export class FeatchNearbyUseCase {
  constructor(private checkInRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FeatchNearbyUseCaseRequest): Promise<FeatchNearbyUseCaseResponse> {
    const gyms = await this.checkInRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}

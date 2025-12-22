import type { Gym } from '../generated/prisma/client.js'
import type { GymsRepository } from '../repositories/gym-repository.js'

interface FeatchNearbyUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FeatchNearbyUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FeatchNearbyUseCaseRequest): Promise<FeatchNearbyUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return { gyms }
  }
}

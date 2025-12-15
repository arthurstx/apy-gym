import type { Gym } from '../generated/prisma/client.js'
import type { GymsRepository } from '../repositories/gym-repository.js'

interface GymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface GymUseCaseResponse {
  gym: Gym
}

export class GymUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: GymUseCaseRequest): Promise<GymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      description,
      latitude,
      longitude,
      title,
      phone,
    })

    return { gym }
  }
}

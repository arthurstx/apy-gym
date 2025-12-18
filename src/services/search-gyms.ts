import type { Gym } from '../generated/prisma/client.js'
import type { GymsRepository } from '../repositories/gym-repository.js'

interface SearchGymsUseCaseRequest {
  query: string
  page: number
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private checkInRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.checkInRepository.searchMany(query, page)

    return { gyms }
  }
}

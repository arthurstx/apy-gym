import { randomUUID } from 'node:crypto'
import { Prisma, type Gym } from '../../generated/prisma/client.js'
import type { GymCreateInput } from '../../generated/prisma/models.js'
import type { GymsRepository } from '../gym-repository.js'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async searchMany(query: string, page: number) {
    const gyms = this.items
      .filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
      .slice((page - 1) * 20, page * 20)

    return gyms
  }

  async create(data: GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
    }

    this.items.push(gym)
    return gym
  }

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id)

    return gym ? gym : null
  }
}

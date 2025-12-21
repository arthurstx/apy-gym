import dayjs from 'dayjs'
import { type CheckIn } from '../../generated/prisma/client.js'
import type { CheckInUncheckedCreateInput } from '../../generated/prisma/models.js'
import { prisma } from '../../lib/prisma.js'
import type { CheckInsRepository } from '../check-ins-repository.js'

export class PrismaCheckInRepository implements CheckInsRepository {
  async create(data: CheckInUncheckedCreateInput) {
    const CheckIn = await prisma.checkIn.create({
      data,
    })
    return CheckIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIn = prisma.checkIn.findFirst({
      where: {
        userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })
    return checkIn
  }

  async countByUserId(userId: string) {
    const count = prisma.checkIn.count({
      where: {
        userId,
      },
    })
    return count
  }

  async findById(id: string) {
    const checkIn = prisma.checkIn.findUnique({
      where: {
        id,
      },
    })
    return checkIn
  }

  async save(data: CheckIn) {
    const checkIn = prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })
    return checkIn
  }

  async findManyByUserId(userId: string, page: number) {
    const CheckIns = prisma.checkIn.findMany({
      where: {
        userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return CheckIns
  }
}

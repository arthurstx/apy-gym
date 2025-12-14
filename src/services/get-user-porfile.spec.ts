import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository.js'
import { hash } from 'bcryptjs'
import { GetUserPorfileUseCase } from './get-user-porfile.js'
import { ResourceNotFound } from './errors/resource-not-found-error.js'

let usersRepository: InMemoryUsersRepository
let sut: GetUserPorfileUseCase

describe('Get user porfile use case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserPorfileUseCase(usersRepository)
  })

  it('Should be able to get user porfile', async () => {
    const email = 'johndoe@example.com'
    const password = '123456'

    const createdUser = await usersRepository.create({
      name: 'john doe',
      email,
      password_hash: await hash(password, 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('john doe')
  })

  it('Should not be able to get user porfile with wrong id', async () => {
    const email = 'johndoe@example.com'

    await usersRepository.create({
      name: 'john doe',
      email,
      password_hash: await hash('123456', 6),
    })

    await expect(
      sut.execute({
        userId: 'non-existing-id',
      })
    ).rejects.toBeInstanceOf(ResourceNotFound)
  })
})

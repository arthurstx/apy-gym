import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository.js'
import { AuthenticateUseCase } from './authenticate.js'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error.js'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate user case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('Should be able to authenticate', async () => {
    const email = 'johndoe@example.com'
    const password = '123456'

    await usersRepository.create({
      name: 'john doe',
      email,
      password_hash: await hash(password, 6),
    })

    const { user } = await sut.execute({
      email,
      password,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should be able to authenticate with wrong password', async () => {
    const email = 'johndoe@example.com'

    await usersRepository.create({
      name: 'john doe',
      email,
      password_hash: await hash('123456', 6),
    })

    await expect(
      sut.execute({
        email,
        password: '654321',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong email', async () => {
    await expect(
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})

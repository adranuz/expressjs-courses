import {envs} from './envs.plugins'

describe('envs.plugins', () => {
  it('should return the envs', () => {
    // console.log(envs)
    expect(envs).toEqual({
      PORT: 3000,
      MAILER_SERVICE: 'gmail',
      MAILER_EMAIL: 'garciasaaib@gmail.com',
      MAILER_SECRET_KEY: 'fykxbthugebswqiw',
      ENV: 'development',
      MONGO_URL: 'mongodb://admin:123456@localhost:27017',
      MONGO_DB_NAME: 'NOC-TEST',
      MONGO_USER: 'admin',
      MONGO_PASSWORD: '123456'
    })
  })
  it('should return error if the envs not found', async() => {
    // lo ideal es hacer una prueba por cada uno de los envs
    jest.resetModules();
    process.env.PORT = 'ABC'
    try {
      // importar este archivo
      await import('./envs.plugins')
      expect(true).toBe(false)
    } catch (error) {
      // console.log(error)
      expect(error+'').toContain('"PORT" should be a valid integer')
    }
  })
})
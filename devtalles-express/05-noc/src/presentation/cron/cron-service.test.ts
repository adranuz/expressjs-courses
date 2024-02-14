import { CronService } from "./cron-service"

describe('cron-service', () => {
  test('should create a cron job', (done) => {
    const mockTick = jest.fn();
    // Arrange
    const job = CronService.createJob('* * * * * *', mockTick)
    job.start()
    // // Act
    setTimeout(() => {
      job.stop()
      expect(mockTick).toHaveBeenCalledTimes(2)
      done()
    }, 2000)
    // Assert
    // expect(job).toBeInstanceOf(CronJob)
  })
})
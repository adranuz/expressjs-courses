import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs"

describe('send-email-logs', () => {
  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn()
  }
  const mockEmailService = {
    sendEmailWithSystemLogs: jest.fn().mockReturnValue(true),
    sendEmail: jest.fn()
  }

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository)

  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should send email and saveLog', async () => {
    // Arrange
    const sendEmailLogs = new SendEmailLogs(
      mockEmailService as any,
      mockLogRepository)
    // Act
    const result = await sendEmailLogs.execute('garciasaaib@gmail.com')
    // Assert
    expect(result).toBe(true)
    expect(mockEmailService.sendEmailWithSystemLogs).toBeCalledTimes(1)
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    expect(mockLogRepository.saveLog).toBeCalledWith({
      createdAt: expect.any(Date),
      level: 'high',
      message: 'Email log sent',
      origin: "send-email-logs.ts",
    })
  })

  test('should log in case of error', async () => {
    // Arrange
    mockEmailService.sendEmailWithSystemLogs.mockReturnValue(false)
    const logError = new LogEntity({
      level: LogSeverityLevel.high,
      message: 'Error: Email not sent',
      origin: "email.service.ts",
    })
    // Act
    const result = await sendEmailLogs.execute('garciasaaib@gmail.com')
    // Assert
    expect(result).toBe(false)
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity))
    // expect(mockLogRepository.saveLog).toHaveBeenCalledWith(logError)
  })
})
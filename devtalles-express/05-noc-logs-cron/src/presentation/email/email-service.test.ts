import { EmailService, SendMailOptions } from "./email-service"
import nodemailer from 'nodemailer'
import { args } from '../../../../04-miltiplication/src/plugins/args.plugin';
describe('email-service.ts', () => {
  // funcion mock
  const mockSendMail = jest.fn()

  // se mockea el transport de nodemailer. solo queremos saber cuando es llamado
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail
  })
  // se crea una instancia de EmailService
  const emailService = new EmailService()
  test('should send email', async () => {
    const options: SendMailOptions = {
      to: 'garciasaaib@gmail.com',
      subject: 'test',
      htmlBody: '<h1>Test</h1>',
    }

    // se llama al metodo sendEmail
    await emailService.sendEmail(options)
    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      html: "<h1>Test</h1>",
      subject: "test",
      to: "garciasaaib@gmail.com",
    })
  })

  test('should send email with attachment', async () => {
    await emailService.sendEmailWithSystemLogs('garciasaaib@gmail.com')
    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: [
        {filename: "logs-all.log", path: "logs/logs-all.log"},
        {filename: "logs-high.log", path: "logs/logs-high.log"},
        {filename: "logs-medium.log", path: "logs/logs-medium.log"}
      ],
      html: expect.any(String),
      subject: "Logs del servidor",
      to: "garciasaaib@gmail.com"
    })
  })
})
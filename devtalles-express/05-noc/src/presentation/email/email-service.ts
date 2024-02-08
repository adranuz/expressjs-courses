import {createTransport} from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugins'
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments: Attachments[];
}
interface Attachments {

}

// TODO: Atachments
export class EmailService {
  private transporter = createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    }
  })

  // para poder seleccionar el repositorio que va a utilizarse
  constructor(private readonly logRepository: LogRepository) {}

  async sendEmail(options: SendMailOptions): Promise<boolean> {
    const { htmlBody, subject, to, attachments = []} = options
    try {
      // enviar correo
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments
      })

      // guardar log de correo enviado
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Email sent`,
        origin: 'email.service.ts'
      })
      this.logRepository.saveLog(log)

      console.log(sentInformation)
      return true
    } catch (error) {
      // guardar log de error al enviar correo
      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Email sent`,
        origin: 'email.service.ts'
      })
      this.logRepository.saveLog(log)
      return false
    }
  }

  async sendEmailWithSystemLogs(to: string | string[]): Promise<boolean> {
    const subject = 'Logs del servidor'
    const htmlBody = `
      <h3>Logs de sistema - NOC</h3>
      <p>Adjunto encontraras los logs de sistema</p>
      <p>Saludos</p>
    `
    const attachments: Attachments[] = [
      { filename: 'logs-all.log', path: 'logs/logs-all.log' },
      { filename: 'logs-high.log', path: 'logs/logs-high.log' },
      { filename: 'logs-medium.log', path: 'logs/logs-medium.log' },
    ]

    return this.sendEmail({ to, subject, htmlBody, attachments })
  }

}
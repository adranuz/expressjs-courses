import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

/** TODO:
 * [ ] - Enviar un correo con todos los logs criticos a media noche
 */
// el acceso a una db
const fileSystemLogRepository = new LogRepositoryImpl(
  // conexion a la db
  new FileSystemDatasource()
)

export class Server {
	public static start() {
		console.log("Server is running");
    // const url = 'http://localhost:3001/posts'

    // mandar email a partir del use-case
    // new SendEmailLogs(
    //   new EmailService(fileSystemLogRepository),
    //   fileSystemLogRepository
    // ).execute(
    //   ['garciasaaib@gmail.com']
    // )

    // crea el servicio de email y envia los logs
    // const emailService = new EmailService(
    //   fileSystemLogRepository
    // )
    // emailService.sendEmailWithSystemLogs(['garciasaaib@gmail.com'])

    // crea el job y lo inicia
    // const job1 = CronService.createJob('*/5 * * * * *', () => {
    //   new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log('Success in '+url),
    //     (error) => console.log(error)
    //   ).execute(url)
    // })
    // job1.start()

	}
}
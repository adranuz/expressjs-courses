import { LogSeverityLevel } from '../domain/entities/log.entity';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { PostgresLogDataSource } from '../infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

/** TODO:
 * [ ] - Enviar un correo con todos los logs criticos a media noche
 */
// el acceso a una db
// const logRepository = new LogRepositoryImpl(
//   // conexion a la db
//   // new FileSystemDatasource()
//   // new MongoLogDataSource()
//   new PostgresLogDataSource()
// )

const postgresLogRepository = new LogRepositoryImpl(
  new PostgresLogDataSource()
)
const mongoLogRepository = new LogRepositoryImpl(
  new MongoLogDataSource()
)
const systemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)
export class Server {
	public static async start() {
		console.log("Server is running");
    // const url = 'http://localhost:3001/posts'
    const url = 'https://google.com'

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

    // get logs by severity level
    // const logs = await logRepository.getLogs(LogSeverityLevel.high)
    // console.log('Logs:', logs)

    // crea el job y lo inicia
    const job1 = CronService.createJob('*/5 * * * * *', () => {
      new CheckServiceMultiple(
        [postgresLogRepository, mongoLogRepository, systemLogRepository],
        () => console.log('Success in '+url),
        (error) => console.log(error)
      ).execute(url)
    })
    job1.start()

	}
}
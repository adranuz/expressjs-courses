export enum LogSeverityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high'
}
/** Segun CleanCode, cuando se tiene mas de 3 argumentos en una funcion
 * /idealmente es mejor mandar un objeto
 */
/**
 * Entity tendra:
 * - la estructura de un log normal, level, message y createAt
 * - el origen de la ruta donde se guardo
 */
export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;
}

export class LogEntity {
  public level: LogSeverityLevel; // enum
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { origin, level, message, createdAt } = options
    this.level = level,
    this.message = message,
    this.createdAt = createdAt ?? new Date(),
    this.origin = origin
  }

  // convierte un JSON a la instancia de LogEntity
  static fromJSON(json: string): LogEntity {
    const { message, level, createdAt, origin } = JSON.parse(json)
    const log = new LogEntity({
      level,
      message,
      createdAt,
      origin,
    })
    return log
  }

  // adapta un objeto a una instancia de LogEntity
  static fromObject(obj: {[key: string]: any}): LogEntity {
    const {message, level, createdAt, origin} = obj
    // validate that there is no missing properties
    const log = new LogEntity({message, level, createdAt, origin})
    return log
  }
}
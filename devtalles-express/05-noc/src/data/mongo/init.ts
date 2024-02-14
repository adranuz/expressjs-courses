import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugins";

// la idea de esto es no usar las env-vars directamente, sino que se pase un objeto con las opciones
// para que a la hora de cambiar de base de datos no haya ningun problema
export interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

// es para establecer la conexion con mongo
export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    const { mongoUrl, dbName } = options;
    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      })
      return true
    } catch (error) {
      // console.log('Error connecting to the database')
      throw error
    }
  }
}
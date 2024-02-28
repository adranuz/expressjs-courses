import mongoose from "mongoose";

/**
 * Los modelos siempre siguen a la entidad
 * la entidad manda sobre los modelos
 * los modelos son los que se conectan a la DB

  level: LogSeverityLevel;
  message: string;
  createdAt?: Date;
  origin: string;

*/

const logSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'low',
  },
  createdAt:{
    type: String,
    default: new Date(),
  },
  origin: {
    type: String,
  },
})

export const LogModel = mongoose.model('Log', logSchema)
import { envs } from "./config/plugins/envs.plugins"
import { LogModel, MongoDatabase } from "./data/mongo"
import { Server } from "./presentation/server"

(async () => {
  main()
})()

async function main() {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  })
  
  const newLog = await LogModel.create({
    message: 'Test message from mongoose',
    level: 'low',
    origin: 'localhost'
  })

  await newLog.save()
  // crear un
  Server.start()
}
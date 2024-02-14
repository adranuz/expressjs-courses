import mongoose from "mongoose";
import { MongoDatabase } from "./init";

describe("init MongoDB", () => {

  afterAll(async () => {
    mongoose.connection.close()
  })
	it("should connect to MongoDB", async () => {
		// Arrange:
    const {MONGO_URL, MONGO_DB_NAME} = process.env
    // Act:
    const connected = await MongoDatabase.connect({
      dbName: MONGO_DB_NAME!,
      mongoUrl: MONGO_URL!
    })
		// Assert:
    // regresa un true cuando esta conectado
    expect(connected).toBe(true)
	});

  it("should throw an error when the connection fails", async () => {
    // Arrange:
    const {MONGO_URL, MONGO_DB_NAME} = process.env
    // Act:
    try {
      await MongoDatabase.connect({
        dbName: MONGO_DB_NAME!,
        mongoUrl: MONGO_URL! + 'invalid'
      })
      // si esto se ejecuta es porque no se lanzo el error
      expect(true).toBe(false)
    } catch (error) {
      // Assert:
      expect(error).toBeDefined()
    }

  })
});

const { getUUID } = require('./uuid.plugin')
const { getAge } = require('./get-age.plugin')
const { httpClientPlugin } = require('./http-client.plugin')
const { buildLogger } = require('./logger.plugin')

module.exports = {
  getUUID,
  getAge,
  buildLogger,
  httpClientPlugin
}
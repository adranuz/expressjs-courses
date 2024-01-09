const {v4: uuidv4Plugin } = require('uuid')

const getUUID = () => uuidv4Plugin()

module.exports = {
  getUUID,
}
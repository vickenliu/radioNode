'user strict'

const config = require('../config')();
const mongoose = require('mongoose');

module.exports = () => {
  return mongoose.createConnection(config.mongodb + 'radio')
}

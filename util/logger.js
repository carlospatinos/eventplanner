// const logger = require('./logger');
const pino = require('pino');

module.exports = pino({
    level: process.env.PINO_LOG_LEVEL || 'info',
});
/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * http://sailsjs.org/#!/documentation/concepts/Logging
 */

var winston = require('winston');
/**
 * Requiring `winston-mongodb` will expose
 * `winston.transports.MongoDB`
 */
require('winston-mongodb').MongoDB;

var customLogger = new winston.Logger({
  transports: [
    new(winston.transports.File)({
      level: 'debug',
      filename: './logs/my_log_file.log'
    }),
    new(winston.transports.MongoDB)({
      level: 'debug',
      db: 'mongodb://localhost:27017/demo_api_database',
      collection: 'logs'
    })
  ]
});

module.exports.log = {
  colors: false,  // To get clean logs without prefixes or color codings
  custom: customLogger
};


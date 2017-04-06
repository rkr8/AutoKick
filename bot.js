var chalk = require('chalk');
var logSymbols = require('log-symbols');
var TelegramBot = require('node-telegram-bot-api');

var bot = null;

// make it modular
module.exports = function (constants) {
    try {
        // long polling is recommended
        bot = new TelegramBot(constants.token, { polling: true });
    } catch (error) {
        // couldn't establish connection with telegram
        console.log(chalk.red(logSymbols.error, error));
        process.exit(1);
    }
    bot.constants = constants;
    // bot uses messageLog to prevent spam
    bot.messageLog = require('./messageLog')(constants.logSize);
    // modularisation is always good
    bot.invite = require('./invite');
    bot.answerAndKick = require('./answerAndKick');
    bot.registerActions = require('./registerActions');
    // everything works fine
    console.log(chalk.green(logSymbols.success, 'The bot was started successfully.'));
    return bot;
};

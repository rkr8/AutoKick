var TelegramBot = require('node-telegram-bot-api');
var chalk = require('chalk');
var logSymbols = require('log-symbols');

// make it modular
module.exports = function (token) {
    bot = null;
    try {
        // long polling is recommended
        bot = new TelegramBot(token, { polling: true });
    } catch (error) {
        // couldn't establish connection with telegram
        console.log(chalk.red(logSymbols.error, error));
        process.exit(1);
    }
    // modularization is always good
    bot.answerAndKick = require('./answerAndKick');
    bot.registerActions = require('./registerActions');
    // everything works fine
    console.log(chalk.green(logSymbols.success, 'The bot was started successfully.'));
    return bot;
};

var constants = require('./constants');

var chalk = require('chalk');
var logSymbols = require('log-symbols');
var TelegramBot = require('node-telegram-bot-api');


var bot = null;

var log = [];

bot.on('message', function (msg) {
    // filter images, stickers, etc.
    if (!(msg.text == null || msg.text == "")) {

    }
});

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
    // modularisation is always god
    bot.answerAndKick = require('./answerAndKick');
    bot.registerActions = require('./registerActions');
    // everything works fine
    console.log(chalk.green(logSymbols.success, 'The bot was started successfully.'));
    return bot;
};
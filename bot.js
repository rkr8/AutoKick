var TelegramBot = require('node-telegram-bot-api');
var chalk = require('chalk');
var logSymbols = require('log-symbols');
var constants = require('./constants');

var bot = null;
try {
    // long polling is recommended
    bot = new TelegramBot(constants.token, { polling: true });
} catch (error) {
    // couldn't establish connection with telegram
    console.log(chalk.red(logSymbols.error, error));
    process.exit(1);
}

// everything works fine
console.log(chalk.green(logSymbols.success, 'The bot was started successfully.'));

// multiple triggers can be specified
constants.triggers.forEach(function (trigger) {
    bot.onText(trigger, function (msg, match) {
        // let him know, why is gets kicked
        bot.sendMessage(msg.chat.id, constants.answer).then(function () {
            bot.kickChatMember(msg.chat.id, msg.from.id).then(function () {
                console.log(chalk.yellow(logSymbols.warning, msg.from.first_name, msg.from.lastname, 'was kicked.'));
            }, function (error) {
                // user is probably admin
                console.log(chalk.red(logSymbols.error, error));
            });
        }, function (error) {
            // bot was probably removed
            console.log(chalk.red(logSymbols.error, error));
        });
    });
});

// make it modular
module.exports = bot;
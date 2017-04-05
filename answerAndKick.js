var chalk = require('chalk');
var logSymbols = require('log-symbols');

module.exports = function answerAndKick(msg, answer) {
    // let them know, why they get kicked
    this.sendMessage(msg.chat.id, answer).catch(function (error) {
        // bot was probably removed
        console.log(chalk.red(logSymbols.error, error));
        return;
    });
    this.kickChatMember(msg.chat.id, msg.from.id).then(function () {
        console.log(chalk.yellow(logSymbols.warning, msg.from.first_name, msg.from.lastname, 'was kicked.'));
    }, function (error) {
        // user is probably admin
        console.log(chalk.red(logSymbols.error, error));
    });
};
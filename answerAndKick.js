var chalk = require('chalk');
var logSymbols = require('log-symbols');
var timers = require('timers');

module.exports = function answerAndKick(msg, answer) {
    // let them know, why they get kicked
    this.sendMessage(msg.chat.id, answer).catch(
        function (error) {
            // bot was probably removed
            console.log(chalk.red(logSymbols.error, error));
            return;
        }
    );
    this.kickChatMember(msg.chat.id, msg.from.id).then(function () {
        console.log(chalk.yellow(logSymbols.warning, msg.from.first_name, msg.from.lastname, 'was kicked.'));
    }, function (error) {
        // user is probably admin
        console.log(chalk.red(logSymbols.error, error));
        return;
    });
    
    // user was successfully kicked
    this.messageLog.addBanned(msg.from.id);

    // TODO: externalize the following function
    timers.setTimeout(
        function () {
            // normal groups don't support invitation links
            if (msg.chat.type == 'supergroup') {
                this.bot.unbanChatMember(msg.chat.id, msg.from.id);
            }
        }.bind(
            {
                // the function above can't access the bot via this
                bot: this
            }
        ),
        this.constants.banTime * 1000
    );
};

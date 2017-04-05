module.exports = function (actions) {
    // multiple actions can be specified
    actions.forEach((action) => {
        bot.onText(action.trigger, (msg) => {
            bot.answerAndKick(msg, action.answer);
        });
    });
}
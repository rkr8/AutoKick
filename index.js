var actions = require('./actions')
var bot = require('./bot')(process.env.TOKEN);
bot.registerActions(require('./actions'));

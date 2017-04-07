module.exports = function () {
    this.on('message', function (msg) {
        // filter images, stickers, etc.
        // TODO: prevent sticker spamming
        
        // send unbanned user invite link
        this.messageLog.banned.forEach(
            function (item) {
                if (item[0] == msg.from.id && new Date()/1000-item[1] > this.bot.constants.banTime) {
                    this.bot.invite (msg);
                    item[0] = null; // TODO: find a cleaner, yet easy, way to remove user from list
                }
            }.bind(
                {
                    bot: this
                }
            )
        );
        
        if (!(msg.text == null || msg.text == "")) {
            this.messageLog.addMessage(msg);
            var count = {};
            this.messageLog.messages.forEach(function (msg) {
                count[msg.text] = (count[msg.text] || 0) + 1;
            });
            if(count[msg.text] >= this.constants.threshold) {
                this.answerAndKick(msg, this.constants.answer);
            }
        }
    });
};

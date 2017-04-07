module.exports = function () {
    this.on('message', function (msg) {
        // filter images, stickers, etc.
        // TODO: prevent sticker spamming
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
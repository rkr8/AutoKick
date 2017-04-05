module.exports = function (size) {
    return {
        index: 0,
        logSize: size,
        messages: new Array(logSize),
        addMessage: function (msg) {
            // minimal ring buffer implementation
            messages[index] = msg;
            index = (index + 1) % logSize;
        }
    }
};
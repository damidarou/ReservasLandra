const { App } = require("@landra_sistemas/lisco");
const { v4: uuidv4 } = require("uuid");

class NLUtils {
    send(event, data) {
        App.nlws.send(
            JSON.stringify({
                id: uuidv4(),
                method: "app.broadcast",
                accessToken: App.nlparams.NL_TOKEN,
                data: { event, data },
            })
        );
    }
    sendCustomMethod(method, event, data) {
        App.nlws.send(
            JSON.stringify({
                id: uuidv4(),
                method: method,
                accessToken: App.nlparams.NL_TOKEN,
                data: { event, data },
            })
        );
    }

    async wrapEvent(message, fn) {
        const response = await fn(message.data);

        return this.send(message.event, { msgid: message.data.msgid, ...response });
    }
}

module.exports = new NLUtils();

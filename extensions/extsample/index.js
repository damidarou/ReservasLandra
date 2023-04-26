const argv = require("minimist")(process.argv.slice(2));
const WS = require("websocket").w3cwebsocket;

const { config } = require("dotenv-defaults");
const { App, Logger } = require("@landra_sistemas/lisco");

const NLUtils = require("./src/common/NLUtils.js");
const SampleController = require("./src/controllers/SampleController.js");

// Obtain required params to start a WS connection from CLI args.
const NL_PORT = argv["nl-port"];
const NL_TOKEN = argv["nl-token"];
const NL_EXTID = argv["nl-extension-id"];

//dotenv
config();

const main = () => {
    //Logs en ../../logs
    Logger.configure();

    const wsmethods = {
        "api.sample": SampleController.sample,
    };
    //Almacenar parametros para su posterior uso.
    App.nlparams = {
        NL_PORT,
        NL_TOKEN,
        NL_EXTID,
    };

    const initConfig = async function () {
        console.log("Extension Connected");
    };

    //Conectar a neutralino
    if (NL_PORT) {
        App.nlws = new WS(`ws://localhost:${NL_PORT}?extensionId=${NL_EXTID}`);
        App.nlws.onerror = function (ex) {
            console.error("Connection error!");
            console.error(ex);
        };

        App.nlws.onopen = initConfig;

        App.nlws.onclose = function () {
            console.log("Connection closed");
            // Make sure to exit the extension process when WS extension is closed (when Neutralino app exits)
            process.exit();
        };
        App.nlws.onmessage = async function (e) {
            if (typeof e.data === "string") {
                const message = JSON.parse(e.data);
                if (wsmethods[message.event]) {
                    //Evaluar los mensajes recibidos para ejecutar los metodos configurados
                    console.log("Message received");
                    console.log(message);
                    // await wsmethods[message.event](message.event, params);
                    await NLUtils.wrapEvent(message, wsmethods[message.event]);
                } else {
                    console.error("Message Event not found: " + message.event);
                }
            }
        };
    } else {
        initConfig();
        App.nlws = {
            send: () => {},
        };
    }
};

main();

//!! Se recomienda incluir handlers para errores no controlados:
process.on("uncaughtException", (err) => {
    // handle the error safely
    console.error(`Error: ${err || err.stack || err.message}`);
});
process.on("unhandledPromiseException", (err) => {
    // handle the error safely
    console.error(`Error: ${err || err.stack || err.message}`);
});

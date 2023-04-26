import { v4 as uuidv4 } from "uuid";

const { Neutralino } = window;

/**
 * Wrapper para realizar llamadas a las extensiones de neutralino de forma que se retorne la respuesta en una promise.
 * 
 * Se genera un id único para la solucitud y se espera el mensaje de vuelta de la extensión con el mismo identificador.
 */
export default class NeutralinoExtensions {
    static call(extid, event, data) {
        return new Promise(async (resolve, reject) => {
            const uuid = uuidv4();
            const callback = ({ detail: data }) => {
                if (data.msgid === uuid) {
                    resolve(data);
                    Neutralino.events.off(event, callback);
                }
            };
            try {
                Neutralino.events.on(event, callback);
                await Neutralino.extensions.dispatch(extid, event, { msgid: uuid, ...data });
            } catch (ex) {
                return reject(ex);
            }
        });
    }

}

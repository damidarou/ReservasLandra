const { v4: uuidv4 } = require("uuid");

class SampleController {
    sample = () => {
        return { result: "hello world" };
    };
}

module.exports = new SampleController();

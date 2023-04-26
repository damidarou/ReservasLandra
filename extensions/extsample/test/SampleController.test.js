const { expect } = require("chai");
const SampleController = require("../src/controllers/SampleController");

describe("SampleController", function () {
    it("#sample()", async function () {
        const response = await SampleController.sample();

        expect(response).not.to.be.null;
        expect(response).to.have.property("result");
        expect(response.result).to.be.eq("hello world");
    });
});

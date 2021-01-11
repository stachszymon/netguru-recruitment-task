const { expect, assert } = require("chai");
const { authFactory, AuthError } = require("../src/utils/auth");
const jwt = require("jsonwebtoken");

const {auth, valid} = authFactory("SECRET")

describe("Auth", function () {

    describe("method: auth", () => {

        it("wrong user data should throw error", () => {
            try {
                auth("username", "password");
            } catch (err) {
                expect(err).instanceof(AuthError)
            }
        })

        it("should get token string", () => {
            try {
                const token = auth("basic-thomas", "sR-_pcoow-27-6PAwCD8");
                expect(token).to.be.a('string');
            } catch (error) {
                assert.fail();
            }
        })

        it("token string is decodable", () => {
            try {
                const token = auth("basic-thomas", "sR-_pcoow-27-6PAwCD8")
                const decoded = jwt.decode(token);

                expect(decoded).to.be.a("object");
            } catch (err) {
                assert.fail()
            }
        })

    })

    describe("method: verify", () => {

        const token = auth("basic-thomas", "sR-_pcoow-27-6PAwCD8")

        it("not be false if valid JWT", () => {
            expect(valid(token)).to.not.be.false;
        })

        it("returns token data", () => {
            expect(valid(token)).to.be.an('object')
        })

        it("return false if invalid JWT", () => {
            expect(valid("LoremIpsumWrongTOken")).to.be.false;
        })

    })

})
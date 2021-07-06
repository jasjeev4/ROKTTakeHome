const model = require('../model/generateoutput')
const messages = require('../messages/messages')
const validators = require('../validators/validators')


describe('Test invalid files', () => {
    test('incorrent file', async () => {
        let ans = await model.createOutput("brokensample1.txt", "0", "10000");
        expect(ans).toMatch(messages.fileCorrupt);
    });

    test('random file', async () => {
        let ans = await model.createOutput("readme.md", "0", "10000");
        expect(ans).toMatch(messages.fileCorrupt);
    });
});

describe('Test valid files', () => {
    test('valid file sample', async () => {
        let ans = await model.createOutput("sample1.txt", "0", "10000", true);
        expect(ans).toBe(true);
    });

    test('valid file with the same start and end date', async () => {
        let ans = await model.createOutput("sample1.txt", "2000-07-07T01:39:41Z", "2000-07-07T01:39:41Z", true);
        expect(ans).toBe(true);
    });
});


describe('Check date order', () => {
    test('invalid date order', async () => {
        let ans = await validators.validateDateOrder("10000", "0");
        expect(ans).toBe(false);
    });

    test('invalid dates', async () => {
        let ans = await validators.validateDateOrder("-10000", "0");
        expect(ans).toBe(false);
    });
});

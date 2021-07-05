const validators = require('../validators/validators')
const messages = require('../messages/messages')

describe('Test invalid date times', () => {
    test('no date provided', async () => {
        let ans = await validators.validateDate("");
        expect(ans).toMatch(messages.reenterDate);
    });

    test('not a date', async () => {
        let ans = await validators.validateDate("aab");
        expect(ans).toMatch(messages.reenterDate);
    });
});

describe('Valid date times ', () => {
    test('Just a year', async () => {
        let ans = await validators.validateDate("2000");
        expect(ans).toBe(true);
    });

    test('UTC time', async () => {
        let ans = await validators.validateDate("2021-07-05T04:16:57Z\n");
        expect(ans).toBe(true);
    });
});
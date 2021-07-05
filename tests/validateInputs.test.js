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
    test('just a year', async () => {
        let ans = await validators.validateDate("2000");
        expect(ans).toBe(true);
    });

    test('UTC time', async () => {
        let ans = await validators.validateDate("2021-07-05T04:16:57Z\n");
        expect(ans).toBe(true);
    });
});


describe('Test invalid file path', () => {
    test('no file path provided', async () => {
        let ans = await validators.validateFilePath("");
        expect(ans).toMatch(messages.reenterFile);
    });

    test('not valid file path', async () => {
        let ans = await validators.validateFilePath("122");
        expect(ans).toMatch(messages.reenterFile);
    });
});

describe('Valid file paths', () => {
    test('sample1.txt', async () => {
        let ans = await validators.validateFilePath("sample1.txt");
        expect(ans).toBe(true);
    });

    test('readme.md', async () => {
        let ans = await validators.validateFilePath("readme.md");
        expect(ans).toBe(true);
    });
});
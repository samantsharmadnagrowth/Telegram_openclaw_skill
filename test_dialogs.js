const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const fs = require("fs");

const apiId = 30972150;
const apiHash = "d4d1bd4591dc991b4b1461ec0d57cd94";
const sessionFile = `${__dirname}/session.txt`;

let stringSession = new StringSession("");
if (fs.existsSync(sessionFile)) {
    stringSession = new StringSession(fs.readFileSync(sessionFile, "utf-8"));
}

(async () => {
    const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });
    await client.start({ onError: (err) => console.log(err) });

    console.log("Fetching dialogs...");
    const limit = 5;
    const dialogs = await client.getDialogs({});
    console.log(`Found ${dialogs.length} dialogs.`);

    // get top 'limit' messages globally or just get messages from top 'limit' dialogs
    const dialogsToFetch = dialogs.slice(0, limit);
    for (const d of dialogsToFetch) {
        const msg = d.message;
        const text = msg ? (msg.message || '[Media]') : 'No message';
        console.log(`Dialog: ${d.title}, Last Msg: ${text}`);
    }

    await client.disconnect();
    process.exit(0);
})();

const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const fs = require("fs");

// --- CONFIGURATION ---
const apiId = 30972150;             // <--- PUT YOUR API ID HERE
const apiHash = "d4d1bd4591dc991b4b1461ec0d57cd94";  // <--- PUT YOUR API HASH HERE
const sessionFile = `${__dirname}/session.txt`;

let stringSession = new StringSession("");
if (fs.existsSync(sessionFile)) {
    const sessionStringContent = fs.readFileSync(sessionFile, "utf-8");
    console.log("DEBUG: session.txt content length:", sessionStringContent.length);
    stringSession = new StringSession(sessionStringContent);
    console.log("DEBUG: StringSession initialized from file.");
} else {
    console.log("DEBUG: session.txt not found, starting with empty StringSession.");
}

// Parse command line arguments
const limit = process.argv.includes("--limit") ? parseInt(process.argv[process.argv.indexOf("--limit") + 1]) : 5;

(async () => {
    try {
        const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });
        await client.start({ onError: (err) => console.log(err) });

        // Fetch all dialogs
        const dialogs = await client.getDialogs();

        let totalFetched = 0;
        console.log(`\n📱 Last ${limit} messages from all Telegram chats:\n`);

        for (const dialog of dialogs) {
            try {
                const msgs = await client.getMessages(dialog.id, { limit: limit });

                if (msgs && msgs.length > 0) {
                    console.log(`\n--- Chat: ${dialog.title} ---`);
                    msgs.reverse().forEach((msg) => {
                        const senderName = msg.sender ?
                            (msg.sender.firstName || msg.sender.username || 'Unknown') :
                            'Unknown Sender';
                        const messageText = msg.message || '[Media/File Message]';
                        console.log(`"${senderName}": "${messageText}"`);
                    });
                    totalFetched += msgs.length;
                }
            } catch (err) {
                console.log(`⚠️ Could not fetch messages for ${dialog.title}: ${err.message}`);
            }
        }

        if (totalFetched > 0) {
            console.log("\n✅ Telegram messages fetched successfully");
        } else {
            console.log("ℹ️ No messages found in any chat");
        }

        // Disconnect immediately (Important for Cron Jobs!)
        await client.disconnect();
        process.exit(0);
    } catch (error) {
        console.error("❌ Error fetching Telegram messages:", error.message);
        console.log("⚠️ Telegram fetcher not properly configured. Please check API credentials and session setup.");
        process.exit(1);
    }
})();
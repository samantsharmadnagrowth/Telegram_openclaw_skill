const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const readline = require("readline");
const fs = require("fs");

// --- CONFIGURATION ---
const apiId = 30972150;
const apiHash = "d4d1bd4591dc991b4b1461ec0d57cd94";
const sessionFile = "session.txt";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

(async () => {
    try {
        console.log("🔐 Telegram Session Generator\n");
        console.log("This will create a new session for your Telegram account.");
        console.log("You'll receive a verification code via Telegram (not SMS).\n");

        const phone = await question("📱 Enter your phone number (with country code, e.g., +918386081172): ");
        
        const stringSession = new StringSession("");
        const client = new TelegramClient(stringSession, apiId, apiHash, { connectionRetries: 5 });
        
        await client.start({
            phoneNumber: async () => phone,
            password: async () => await question("🔑 Enter your 2FA password (if enabled, otherwise press Enter): "),
            phoneCode: async () => await question("📬 Enter the verification code sent to your Telegram app: "),
            onError: (err) => console.log("❌ Error:", err),
        });

        // Save the session string
        const sessionString = client.session.save();
        fs.writeFileSync(sessionFile, sessionString);
        
        console.log("\n✅ Session saved successfully to:", sessionFile);
        console.log("\n📋 Your session string (save this securely):");
        console.log(sessionString);
        console.log("\nYou can now use the telegram-fetcher skill!");
        
        await client.disconnect();
        rl.close();
        process.exit(0);
    } catch (error) {
        console.error("\n❌ Error:", error.message);
        console.log("\n⚠️  Please try again. Make sure you enter the correct phone number and verification code.");
        rl.close();
        process.exit(1);
    }
})();

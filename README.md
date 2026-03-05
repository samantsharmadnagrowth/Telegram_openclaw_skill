# Telegram_openclaw_skill
OpenClaw skill that enables users to access Telegram through the OpenClaw AI agent.

# Telegram Message Fetcher

A simple Node.js tool to fetch and display the latest messages from your Telegram chats using the GramJS library.

## 🚀 Features

- **Authentication**: Easy session generation and storage.
- **Multi-Chat Fetching**: Fetches the latest messages from all active dialogs.
- **Customizable**: Adjustable message limit per chat via command-line arguments.
- **Session Persistence**: Saves authentication to `session.txt` for repeated use without re-logging.

## 📋 Prerequisites

- **Node.js**: Version 16 or higher recommended.
- **Telegram API Credentials**: You need an `apiId` and `apiHash` from [my.telegram.org](https://my.telegram.org/auth).

## 🛠️ Installation

1. Clone or download this repository.
2. Open a terminal in the project directory.
3. Install the required dependencies:
   ```bash
   npm install telegram
   ```

## 🔐 Setup & Authentication

Before fetching messages, you must generate a session:

1. Open `auth.js` and ensure your `apiId` and `apiHash` are correctly set.
2. Run the authentication script:
   ```bash
   node auth.js
   ```
3. Follow the prompts:
   - Enter your phone number (including country code).
   - Enter your 2FA password (if enabled).
   - Enter the verification code sent to your Telegram app.
4. A `session.txt` file will be created. **Keep this file secure** as it allows access to your Telegram account.

## 📖 Usage

Once authenticated, you can fetch messages using `fetch_tg.js`.

### Basic Fetch
Fetches the last 5 messages from all chats:
```bash
node fetch_tg.js
```

### With Custom Limit
Fetches a specific number of messages (e.g., 10) per chat:
```bash
node fetch_tg.js --limit 10
```

## 📁 Project Structure

- `auth.js`: Script for generating a persistent Telegram session.
- `fetch_tg.js`: Main script for fetching and displaying messages.
- `session.txt`: Stored session string (automatically generated).
- `last_msg_id.txt`: Internal file for tracking message status (if applicable).

## ⚠️ Important Note

This tool uses your personal Telegram API credentials. Avoid sharing your `apiId`, `apiHash`, or `session.txt` with anyone.

---
name: telegram-fetcher
description: Fetches historical messages from a Telegram channel using Node.js.
---

# Telegram Fetcher (Node.js)

This skill downloads recent messages from a public Telegram channel or your personal chats.

## Usage
Use this when the user wants to "read telegram", "fetch channel history", or "scrape telegram".

## Commands

#### Fetch Messages
> Runs the Node.js script. Replace {{channel}} with the channel name (e.g. @news).

```bash
node skills/telegram-fetcher/fetch_tg.js --channel {{channel}}
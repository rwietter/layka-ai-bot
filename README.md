## Layka AI Telegram Bot

Layka AI is a Telegram bot that uses the OpenAI API to generate text. To use the bot, you must have a Telegram account and a OpenAI API key. The bot is currently in development and is not yet available on Telegram.

---

## Installation

```bash
git clone https://github.com/rwietter/layka-ai-bot.git
cd layka-ai-bot
npm install or yarn install
npm run dev or yarn dev
```

### Requirements

- Node v16.19.0
- MongoDB

---

## Features

- [x] Create bot on Telegram
- [x] Set API KEY command
- [x] Start chat message
- [x] Receive messages from users and send response with answer from GPT-3
- [x] Store API KEY in database
- [x] Delete API KEY command
- [x] Update API KEY command
- [x] /lang command to set programming language
- [x] /send command to send messages from groups
- [ ] Validate API KEY
- [ ] Middleware to validate API KEY
- [ ] Add logger tool to capture errors

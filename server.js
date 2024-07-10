const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const token = '7481869853:AAFquO5oXO_lECOfJybgwnEAaTQrzjYd_no';
const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Welcome to Number Connect Game! Click the button below to start playing:', {
        reply_markup: {
            inline_keyboard: [[
                {
                    text: 'Play Game',
                    web_app: {url: 'https://anbessaa.github.io/telegram-2248-game/'}
                }
            ]]
        }
    });
});

app.use(express.static('public')); // Serve your game files

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
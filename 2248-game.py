from telegram import Update, WebAppInfo
from telegram.ext import Application, CommandHandler, ContextTypes
from telegram import KeyboardButton, ReplyKeyboardMarkup

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    web_app = WebAppInfo(url="https://github.com/Anbessaa/2248.git")
    keyboard = [[KeyboardButton("Play 2248", web_app=web_app)]]
    reply_markup = ReplyKeyboardMarkup(keyboard)
    await update.message.reply_text("Press the button to play 2248!", reply_markup=reply_markup)

def main():
    application = Application.builder().token('7105929167:AAHqO6yUgp0f0FXN9tQMGxozQjGRKcPAw-8').build()
    application.add_handler(CommandHandler("start", start))
    application.run_polling()

if __name__ == '__main__':
    main()
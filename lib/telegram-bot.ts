import TelegramBot from 'node-telegram-bot-api';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Telegram configuration
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHANNEL_ID = process.env.TELEGRAM_CHANNEL_ID || '@swfxglobal';
const TELEGRAM_LINK = 'https://t.me/swfxglobal';

if (!BOT_TOKEN) {
  console.warn('⚠️ TELEGRAM_BOT_TOKEN not set. Telegram features disabled.');
}

let bot: TelegramBot | null = null;

if (BOT_TOKEN) {
  bot = new TelegramBot(BOT_TOKEN, { polling: true });
  console.log('✅ Telegram bot initialized');
}

/**
 * Send signal to Telegram channel
 */
export async function postSignalToTelegram(signal: any) {
  if (!bot) {
    console.warn('⚠️ Telegram bot not available');
    return null;
  }

  const direction = signal.pair.includes('SELL') ? '🔴 SELL' : '🟢 BUY';
  
  const message = `
🔔 **SWFX SIGNAL** 🔔

📊 **${signal.pair}** — ${signal.timeframe}
${direction} (${signal.entry})

📌 **Entry:** ${signal.entry}
🛑 **SL:** ${signal.sl}
🎯 **TP1:** ${signal.tp1}
🎯 **TP2:** ${signal.tp2}
🎯 **TP3:** ${signal.tp3}
${signal.tp4 ? `🎯 **TP4:** ${signal.tp4}` : ''}
${signal.tp5 ? `🎯 **TP5:** ${signal.tp5}` : ''}

📈 **RR:** ${signal.rr || 'N/A'}

💡 **Analysis:**
${signal.analysis ? signal.analysis.slice(0, 300) : 'N/A'}${signal.analysis && signal.analysis.length > 300 ? '...' : ''}

🔗 **Full Analysis:** https://swfx.com/signals/${signal.id}
💬 **Join Community:** ${TELEGRAM_LINK}

#${signal.pair} #${signal.status.toLowerCase()}
  `;

  try {
    const result = await bot.sendMessage(CHANNEL_ID, message, {
      parse_mode: 'Markdown',
      disable_web_page_preview: true,
    });
    console.log(`✅ Signal posted to Telegram: ${signal.id}`);
    return result;
  } catch (error) {
    console.error('❌ Error posting to Telegram:', error);
    return null;
  }
}

/**
 * Send test message
 */
export async function sendTestMessage() {
  if (!bot) {
    console.warn('⚠️ Telegram bot not available');
    return null;
  }

  const message = `
🚀 **SWFX Telegram Bot**

✅ Bot is running!
📡 Connected to channel: ${CHANNEL_ID}
💬 Join: ${TELEGRAM_LINK}

📊 Features:
- Auto-posting signals
- Market analysis
- Trading insights
  `;

  try {
    const result = await bot.sendMessage(CHANNEL_ID, message, {
      parse_mode: 'Markdown',
    });
    console.log('✅ Test message sent to Telegram');
    return result;
  } catch (error) {
    console.error('❌ Error sending test message:', error);
    return null;
  }
}

export default bot;
export { TELEGRAM_LINK, CHANNEL_ID };

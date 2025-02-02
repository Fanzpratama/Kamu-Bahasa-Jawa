const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');

// Ganti dengan token bot yang kamu dapatkan dari BotFather
const token = '7918727784:AAGImPg3Unaf66EUVpFmkBpLGDIw78UbNtk';
const bot = new TelegramBot(token, { polling: true });

// Path ke file JSON
const kamusFile = path.join(__dirname, 'kamus.json');

// Fungsi untuk memuat database kamus
const loadKamus = () => {
  try {
    const data = fs.readFileSync(kamusFile, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error loading kamus:', err);
    return {};
  }
};

// Menangani perintah /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const welcomeMessage = `
  Selamat datang di Bot Kamus Bahasa Jawa! 🌸
  Ketikkan kata dalam bahasa Indonesia, dan saya akan memberikan terjemahannya dalam bahasa Jawa.

  Contoh:
  - Ketik "baik" untuk terjemahan bahasa Jawa.
  - Ketik "selamat" untuk terjemahan bahasa Jawa.

  Semoga bermanfaat! 😊
  jika ada kata yang ingin ditambahkan silahkan berikan masukan dan kirim pesan ke instagram saya @fandiganzid
  `;
  bot.sendMessage(chatId, welcomeMessage);
});

// Menangani pesan dari pengguna
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase().trim();

  // Cek apakah pesan adalah kata yang ada di kamus
  const kamus = loadKamus();
  if (kamus[text]) {
    bot.sendMessage(chatId, `Terjemahan dari "${text}" adalah: ${kamus[text]}`);
  } else {
    bot.sendMessage(chatId, `Maaf, kata "${text}" tidak ditemukan di kamus.`);
  }
});

console.log('Bot sedang berjalan...');

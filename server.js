const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cron = require('node-cron');
const TelegramBot = require('node-telegram-bot-api');

const helpers = require('./helpers');
const mongo = require('./dbConnection');

const prod = process.env.NODE_ENV === 'production';
if (!prod) {
  require('dotenv').config();
}

const PORT = process.env.PORT || 5000;
const token = process.env.BOT_KEY;

// const db = mongo.getDb();
let db;
// Init app
const app = express();

app.get('/', (req, res) => {
  return res.send('Hello Cats!');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Run cron job every day at 10:15
cron.schedule('15 15 * * *', () => {
  sendMessages();
});

// Telegram bot
const bot = new TelegramBot(token, { polling: true });

const UNSUBSCRIBE_PHOTO = './assets/images/grumpy.jpg';

const sendMessages = () => {
  db.collection('subscribers').find().toArray((err, users) => {
    helpers.getRandomFact()
      .then(({ fact, url }) => {
        users.map(({ id }) => {
          bot.sendPhoto(id, url, { caption: fact });
        });
      });
  });
};

bot.on("polling_error", (err) => console.log(err));

bot.on('callback_query', (msg) => {
  const {
    message: { chat },
    data,
  } = msg;

  if (data === 'subscribe') {
    subscribe(chat);
  }

  if (data === 'getfact') {
    helpers.getRandomFact()
      .then(({ fact, url }) => {
        bot.sendPhoto(chat.id, url, { caption: fact });
      });
  }
});

bot.onText(/\/start/, (msg) => {
  const id = msg.chat.id;

  const keyboard = [
    [{ text: 'Subscribe', callback_data: 'subscribe' }],
    [{ text: 'Get fact about cats', callback_data: 'getfact' }]
  ]

  bot.sendMessage(id, 'Meow! Subscribe to get weekly cat facts. 🐱', { reply_markup: { inline_keyboard: keyboard } })
});


const subscribe = (chatData) => {
  const { id, first_name, last_name, username } = chatData;

  db.collection('subscribers').findOne({ id }, (err, user) => {
    if (err) return console.log(err)

    if (user) {
      bot.sendMessage(id, 'You already subscribed!');
    } else {
      db.collection('subscribers').insertOne({ id, first_name, last_name, username }, () => {
        bot.sendMessage(id, 'Now you will receive awesom cat facts every week! Here is your first one :)');
        helpers.getRandomFact()
          .then(({ fact, url }) => {
            bot.sendPhoto(id, url, { caption: fact });
          });
      });
    }
  });
};

bot.onText(/\/subscribe/, (msg) => {
  subscribe(msg.chat);
});

bot.onText(/\/unsubscribe/, (msg) => {
  const id = msg.chat.id;

  db.collection('subscribers').findOne({ id }, (err, user) => {
    if (user) {
      db.collection('subscribers').findOneAndDelete({ id }, (err, result) => {
        if (err) return console.log(err)

        bot.sendPhoto(id, UNSUBSCRIBE_PHOTO, { caption: 'Big deal...' });
      })
    } else {
      bot.sendMessage(id, 'You are not subscribed to weekly cat facts. Want to /subscribe ?');
    }
  });
});

bot.onText(/\/getfact/, (msg) => {
  const id = msg.chat.id;

  helpers.getRandomFact()
    .then(({ fact, url }) => {
      bot.sendPhoto(id, url, { caption: fact });
    });
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Connect DB
mongo.connect((err, client) => {
  if (err) console.log(err);

  db = mongo.getDb();

  // Start app
  app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
  });
});
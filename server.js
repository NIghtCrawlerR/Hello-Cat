const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const TelegramBot = require('node-telegram-bot-api');

const constants = require('./constants');
const helpers = require('./helpers');
const mongo = require('./dbConnection');

const { TOKEN, PORT, UNSUBSCRIBE_PHOTO } = constants;

let db;

// Init app
const app = express();

app.get('/', (req, res) => {
  return res.send('Ping!');
});

app.get('/daily-message', (req, res) => {
  sendMessages();
  return res.send('Daily message was sent!');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Telegram bot
const bot = new TelegramBot(TOKEN, { polling: true });

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

  bot.sendMessage(id, 'Meow! Subscribe to get daily cat facts. 🐱', { reply_markup: { inline_keyboard: keyboard } })
});


const subscribe = (chatData) => {
  const { id, first_name, last_name, username } = chatData;

  db.collection('subscribers').findOne({ id }, (err, user) => {
    if (err) return console.log(err)

    if (user) {
      bot.sendMessage(id, 'You already subscribed!');
    } else {
      db.collection('subscribers').insertOne({ id, first_name, last_name, username }, () => {
        bot.sendMessage(id, 'Now you will receive awesom cat facts every day! Here is your first one :)');
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
      bot.sendMessage(id, 'You are not subscribed to daily cat facts. Want to /subscribe ?');
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
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const isEqual = require('lodash/isEqual');
const mongoClient = require('mongodb').MongoClient;
const TelegramBot = require('node-telegram-bot-api');

const prod = process.env.NODE_ENV === 'production';
if (!prod) {
  require('dotenv').config();
}


const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT || 5000;
const token = process.env.BOT_KEY;
const FACTS_API = process.env.FACTS_API;
const CAT_IMAGE_API = process.env.CAT_IMAGE_API;

let db;

// Init app
const app = express();

app.get('/', (req, res) => {
  return res.send('Hello Cats!');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Telegram bot
const bot = new TelegramBot(token, { polling: true });

const UNSUBSCRIBE_PHOTO = './assets/images/grumpy.jpg';
const MESSAGE_TIME = {
  day: 1, // Monday, 10:01
  hours: 10,
  minutes: 1,
};

let interval = null;

const getRandomFact = async () => {
  const requestFact = {
    url: FACTS_API,
    method: 'get',
  };

  const requestImage = {
    url: CAT_IMAGE_API,
    method: 'get',
  };

  const data = await Promise.all([axios(requestFact), axios(requestImage)])
    .then((res) => {
      const [resFact, resImage] = res;
      const { data: { fact } } = resFact;
      const { data: { 0: { url } } } = resImage;

      return { fact, url };
    });

  return data;
};

const getTime = () => {
  const date = new Date();
  const day = date.getDay();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return { day, hours, minutes };
};

const sendMessages = () => {
  db.collection('subscribers').find().toArray((err, users) => {
    getRandomFact()
      .then(({ fact, url }) => {
        users.map(({ id }) => {
          bot.sendPhoto(id, url, { caption: fact });
        });
      });
  });
};

const checkTime = () => {
  const currentTime = getTime();
  const isTimeEqual = isEqual(currentTime, MESSAGE_TIME);

  if (isTimeEqual) {
    sendMessages();
    clearInterval(interval);

    setTimeout(() => {
      startTimer();
    }, 300000);
  }
};

const startTimer = () => {
  interval = setInterval(() => {
    checkTime();
  }, 2000);
}

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
    getRandomFact()
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
        getRandomFact()
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

  getRandomFact()
    .then(({ fact, url }) => {
      bot.sendPhoto(id, url, { caption: fact });
    });
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Connect DB
mongoClient.connect(DB_URL, { useUnifiedTopology: true }, (err, client) => {
  if (err) console.log(err);
  db = client.db('hello-cat');
  startTimer();

  // Start app
  app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
  });
});

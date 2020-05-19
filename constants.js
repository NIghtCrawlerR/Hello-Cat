const prod = process.env.NODE_ENV === 'production';
if (!prod) {
  require('dotenv').config();
}

const PORT = process.env.PORT || 5000;
const TOKEN = process.env.BOT_KEY;
const FACTS_API = process.env.FACTS_API;
const CAT_IMAGE_API = process.env.CAT_IMAGE_API;
const UNSUBSCRIBE_PHOTO = './assets/images/grumpy.jpg';

module.exports = {
  PORT,
  TOKEN,
  FACTS_API,
  CAT_IMAGE_API,
  UNSUBSCRIBE_PHOTO,
};
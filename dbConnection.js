const mongoClient = require('mongodb').MongoClient;

const prod = process.env.NODE_ENV === 'production';
if (!prod) {
  require('dotenv').config();
}

const DB_URL = process.env.DB_URL;

let _db;

module.exports = {
  connect: (callback) => {
    mongoClient.connect(DB_URL, { useNewUrlParser: true }, (err, client) => {
      _db = client.db('hello-cat');

      return callback(err, client);
    });
  },

  getDb: () => {
    return _db;
  }
};
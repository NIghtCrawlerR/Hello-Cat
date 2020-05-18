const axios = require('axios');

const prod = process.env.NODE_ENV === 'production';
if (!prod) {
  require('dotenv').config();
}

const FACTS_API = process.env.FACTS_API;
const CAT_IMAGE_API = process.env.CAT_IMAGE_API;

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

module.exports = {
  getRandomFact,
};

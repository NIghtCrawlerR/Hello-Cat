const axios = require('axios');
const constants = require('./constants');

const { FACTS_API, CAT_IMAGE_API } = constants;

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

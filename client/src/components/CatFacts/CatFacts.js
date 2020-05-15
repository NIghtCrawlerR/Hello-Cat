import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Container,
  Wrap,
  BubbleLeft,
  BubbleRight,
  ButonsWrap,
  TelegramLogo,
} from './style';
import { TelegramButton, MainButton } from '../../shared/style';

const TELEGRAM_LOGO = require('../../assets/images/telegram.png');
const FACTS_API_URL = 'https://cat-fact.herokuapp.com/facts';
const MAX_SIZE = 7;

const CatFacts = () => {
  const [allFacts, setFacts] = useState([]);
  const [previousFacts, setPreviousFacts] = useState([]);
  const [randomFacts, setRandomFacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const request = {
      url: FACTS_API_URL,
      method: 'get',
    };

    axios(request)
      .then(({ data }) => {
        setFacts(data.all);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    getRandomFacts();
  }, [allFacts]);

  const getRandomFacts = () => {
    if (allFacts.length === 0) return false;

    const indexArr = [];

    while (indexArr.length < MAX_SIZE) {
      const random = Math.floor(Math.random() * allFacts.length) + 1;

      if (!indexArr.includes(random)
        && !previousFacts.includes(random)) {
        indexArr.push(random)
      };
    }

    const randomFacts = allFacts.filter((fact, i) => indexArr.includes(i));

    setPreviousFacts([...previousFacts, indexArr])
    setRandomFacts(randomFacts);
  }

  return (
    <Container>
      <Wrap>
        {loading && 'Loading...'}
        {!loading && (randomFacts || []).map((fact, i) => {
          return i % 2 === 0
            ? <BubbleLeft key={fact._id}>{fact.text}</BubbleLeft>
            : <BubbleRight key={fact._id}>{fact.text}</BubbleRight>
        })}
      </Wrap>

      <ButonsWrap>
        <MainButton onClick={getRandomFacts}>Show other facts</MainButton>
        {/* <a href="t.me/HelloCatsBot"> */}
          <TelegramButton onClick={() => window.open('https://t.me/HelloCatsBot', '_blank')}>
            Subscribe
          <TelegramLogo src={TELEGRAM_LOGO} alt="telegram bot" />
          </TelegramButton>
        {/* </a> */}
      </ButonsWrap>
    </Container>
  );
}

export default CatFacts;

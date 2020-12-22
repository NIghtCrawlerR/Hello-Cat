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
const FACTS_API_URL = 'https://catfact.ninja/facts';

const CatFacts = () => {
  const [allFacts, setFacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFacts = (limit = 10) => {
    setLoading(true);

    const request = {
      url: `${FACTS_API_URL}?limit=${limit}`,
      method: 'get',
    };

    axios(request)
      .then(({ data }) => {
        setFacts(data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    getFacts();
  }, []);

  return (
    <Container>
      <Wrap>
        {loading && 'Loading...'}
        {!loading && (allFacts || []).map(({ fact }, i) => {
          return i % 2 === 0
            ? <BubbleLeft key={i}>{fact}</BubbleLeft>
            : <BubbleRight key={i}>{fact}</BubbleRight>
        })}
      </Wrap>

      <ButonsWrap>
        <MainButton onClick={() => getFacts()}>Show other facts</MainButton>
        <TelegramButton onClick={() => window.open('https://t.me/HelloCatsBot', '_blank')}>
          Subscribe
          <TelegramLogo src={TELEGRAM_LOGO} alt="telegram bot" />
        </TelegramButton>
      </ButonsWrap>
    </Container>
  );
}

export default CatFacts;

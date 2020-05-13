import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Wrap, FactsWrap, BubbleLeft, BubbleRight, Button } from './style';

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

  if (loading) return 'Loading...';

  return (
    <Wrap>
      <FactsWrap>
        {(randomFacts || []).map((fact, i) => {
          return i % 2 === 0
            ? <BubbleLeft key={fact._id}>{fact.text}</BubbleLeft>
            : <BubbleRight key={fact._id}>{fact.text}</BubbleRight>
        })}
      </FactsWrap>

      <Button onClick={getRandomFacts}>Show other facts</Button>
    </Wrap>
  );
}

export default CatFacts;

import React from 'react';

import { BackgroundWrap, Image } from './style';

const CAT_1 = require('../../assets/images/cat-1.png');
const CAT_2 = require('../../assets/images/cat-2.png');
const CAT_3 = require('../../assets/images/cat-3.png');
const CAT_4 = require('../../assets/images/cat-4.png');
const CAT_5 = require('../../assets/images/cat-5.png');
const CAT_6 = require('../../assets/images/cat-6.png');
const CAT_7 = require('../../assets/images/cat-7.png');
const CAT_8 = require('../../assets/images/cat-8.png');
const CAT_9 = require('../../assets/images/cat-9.png');

const Background = () => {
  return (
    <BackgroundWrap>
      <Image src={CAT_1} rotate="-15" top="10%" left="25%" size="300" />
      <Image src={CAT_2} rotate="-90" top="20%" right="0" />
      <Image src={CAT_2} rotate="0" bottom="0" left="20%" size="180" />
      <Image src={CAT_3} rotate="-30" bottom="35%" right="5%" />
      <Image src={CAT_4} rotate="40" right="20%" top="8%" size="300" />
      <Image src={CAT_5} rotate="0" left="5%" top="30%" size="300" />
      <Image src={CAT_5} rotate="-130" right="20%" bottom="20%" />
      <Image src={CAT_6} rotate="180" right="0" top="0" size="150" />
      <Image src={CAT_7} rotate="0" right="5%" bottom="0" />
      <Image src={CAT_8} rotate="90" left="0" bottom="10%" size="250" />
      <Image src={CAT_9} rotate="180" top="0" left="5%" width="200" height="150" />
    </BackgroundWrap>
  );
}
 
export default Background;
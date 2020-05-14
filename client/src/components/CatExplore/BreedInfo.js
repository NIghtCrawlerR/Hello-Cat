import React from 'react';

import { ImagesWrap, Image, ImageOuter, Title, Bold } from './style';

const BreedInfo = ({ breed, images }) => {
  const { name, origin, description, life_span, temperament, wikipedia_url } = breed;

  return (
    <div>
      <Title href={wikipedia_url} target="_blank">{name}</Title>
      <p><Bold>Origin country:</Bold> {origin}</p>
      <p><Bold>Life:</Bold> {life_span} years</p>
      <p><Bold>Temperament:</Bold> {temperament}</p>
      <p>{description}</p>

      <ImagesWrap>
        {images.map(breed => (
          <ImageOuter key={breed.id}>
            <Image src={breed.url} alt="" />
          </ImageOuter>
        ))}
      </ImagesWrap>
    </div>
  );
}

export default BreedInfo;

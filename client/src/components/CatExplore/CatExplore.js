import React, { useState, useEffect } from 'react';
import axios from 'axios';

import BreedInfo from './BreedInfo';
import { Wrap, Select, Label } from './style';

const CAT_BREEDS_URL = 'https://api.thecatapi.com/v1/breeds';
const BREED_IMAGES_URL = 'https://api.thecatapi.com/v1/images/search';
const HEADERS = {
  'Content-Type': 'application/json',
  'x-api-key': 'f6a8a88b-7e27-43d0-b71b-2db494cacdbd',
};

const CatExplore = () => {
  const [breeds, setBreeds] = useState([]);
  const [currentBreed, setCurrentBreed] = useState({});
  const [breedImages, setBreedImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const request = {
      url: CAT_BREEDS_URL,
      method: 'get',
      headers: HEADERS,
    }

    axios(request)
      .then(({ data }) => {
        const allBreeds = data.map(breed => {
          const newBreed = breed;
          breed.value = breed.id;
          breed.label = breed.name;

          return newBreed;
        })

        setBreeds(allBreeds);
        setCurrentBreed(allBreeds[0]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
  }, []);

  const getBreedImages = () => {
    setLoading(true);

    const request = {
      url: BREED_IMAGES_URL,
      method: 'get',
      headers: HEADERS,
      params: {
        breed_id: currentBreed.id,
        limit: 9,
      },
    };

    axios(request)
      .then(({ data }) => {
        setBreedImages(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      })
  }

  useEffect(() => {
    if (Object.keys(currentBreed).length) {
      getBreedImages();
    }
  }, [currentBreed]);

  if (loading) return <Wrap>Loading...</Wrap>;

  return (
    <Wrap>
      <Label>Select cat breed:</Label>
      <Select
        value={currentBreed}
        onChange={(breed) => setCurrentBreed(breed)}
        options={breeds}
        isSearchable
      />

      <BreedInfo breed={currentBreed} images={breedImages} />
    </Wrap>
  );
}

export default CatExplore;
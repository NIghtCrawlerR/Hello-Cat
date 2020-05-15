import styled from 'styled-components';
import ReactSelect from 'react-select';

import { MainWrap } from '../../shared/style';

export const Wrap = styled(MainWrap)`
  width: 70%;
  margin-bottom: 50px;

  @media screen and (max-width: 768px) {
    width: 94%;
  }
`;

export const ImagesWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
`;

export const ImageOuter = styled.div`
  position: relative;
  max-width: calc(99% / 3);

  @media screen and (max-width: 768px) {
    max-width: calc(98% / 2);
  }

  @media screen and (max-width: 540px) {
    max-width: 100%;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 225px;
  object-fit: cover;
`;

export const Title = styled.a`
  display: inline-block;
  margin-top: 20px;
  margin-bottom: 10px;
  border-bottom: 3px solid #e75718;
  font-size: 28px;
  font-weight: 700;
  color: #e75718;
  text-decoration: none;

  @media screen and (max-width: 768px) {
    font-size: 22px;
  }
`;

export const Bold = styled.span`
  font-weight: 600;
`;

export const Select = styled(ReactSelect)`
  & > div {
    cursor: pointer;
  }
`;

export const Label = styled.p`
  margin: 10px 0 5px 0;
  font-size: 16px;
  font-weight: 600;
`;

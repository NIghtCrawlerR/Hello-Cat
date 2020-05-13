import styled from 'styled-components';
import { NavLink  as ReactLink } from 'react-router-dom';

export const Title = styled.h3`
  margin: 30px 0 0;
  font-family: 'Luckiest Guy', cursive;
  font-size: 68px;
  color: #ed8d39;
  letter-spacing: 2.5px;

  @media screen and (max-width: 768px) {
    font-size: 54px;
  }
`;

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100%;
  max-width: 1280px;
  margin: 0 auto;
  z-index: 1;
`;

export const LinksWrap = styled.div`
  display: flex;
  margin: 40px 0 40px 0;
`;

export const Link = styled(ReactLink)`
  min-width: 160px;
  margin: 0 15px;
  padding: 15px 25px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 500;
  background: rgba(255, 255, 255, .7);
  color: #e85d1b;
  border: 2px solid #e85c1a;

  &.active {
    color: #fff;
    background-image: linear-gradient(to right,#fc6076,#ff9a44,#ef9d43,#e75516);
    box-shadow: 0 4px 15px 0 rgba(252,104,110,0.75);
    border: 0;
  }

  @media screen and (max-width: 768px) {
    min-width: 140px;
    padding: 10px 20px;
    font-size: 14px;
  }
`;

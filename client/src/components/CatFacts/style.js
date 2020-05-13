import styled from 'styled-components';
import { MainButton, MainWrap } from '../../shared/style';

export const Container = styled.div`
  width: 50%;
  padding: 20px;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 100%; 
  }
`;

export const Wrap = styled(MainWrap)`
  max-height: 75%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
    border-radius: 2px;
  }
   
  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
   
  &::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
    border-radius: 4px;
  }
`;

export const Bubble = styled.div`
  position: relative;
  margin: 20px 0;
  padding: 8px 15px;
  border-radius: 20px;

  &::before {
    content: "";
    position: absolute;
    z-index: 0;
    bottom: 0;
    height: 20px;
    width: 20px;
  }

  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    bottom: 0;
    width: 10px;
    height: 20px;
    background: white;
  }
`;

export const BubbleLeft = styled(Bubble)`
  align-items: flex-start;
  margin-right: 25%;
  background-color: #eee;
  transform: rotate(-1deg);

  &::before {
    left: -7px;
    background: #eee;
    border-bottom-right-radius: 15px;
  }

  &::after {
    left: -10px;
    border-bottom-right-radius: 10px;
  }
`;

export const BubbleRight = styled(Bubble)`
  align-items: flex-end;
  margin-left: 25%;
  color: white;
  background: linear-gradient(to bottom, #00D0EA 0%, #0085D1 100%);
  background-attachment: fixed;
  transform: rotate(2deg);

  &::before {
    right: -8px;
    background: linear-gradient(to bottom, #00D0EA 0%, #0085D1 100%);
    background-attachment: fixed;
    border-bottom-left-radius: 15px;
  }

  &::after {
    right: -10px;
    border-bottom-left-radius: 10px;
  }
`;

export const Button = styled(MainButton)`
  display: block;
  margin: 30px auto 50px auto;
`;
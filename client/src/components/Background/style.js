import styled, { css } from 'styled-components';

const handlePosition = (value) => {
  if (value) return `${value}`;
};

export const BackgroundWrap = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`;

export const Image = styled.div`
  position: absolute;
  width: ${props => props.width || props.size || 200}px;
  height: ${props => props.height || props.size || 200}px;
  background-image: url(${props => props.src});
  background-position: 50% 50%;
  background-size: cover;
  top: ${props => handlePosition(props.top)};
  left: ${props => handlePosition(props.left)};
  right: ${props => handlePosition(props.right)};
  bottom: ${props => handlePosition(props.bottom)};

  ${props =>
    props.rotate && css`
      transform: rotate(${props.rotate}deg);
    `
  };

  @media screen and (max-width: 768px) {
    width: ${props => (props.width || props.size) / 2 || 100}px;
    height: ${props => (props.height || props.size) / 2 || 100}px;
  }
`;

export const ParralaxLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
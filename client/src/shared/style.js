import styled from 'styled-components';

export const MainButton = styled.button`
  min-width: 200px;
  height: 50px;
  padding: 5px 25px;
  text-align: center;
  border: none;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .5px;
  color: #fff;
  cursor: pointer;
  background-size: 300% 100%;
  background-image: linear-gradient(to right, #fc6076, #ff9a44, #ef9d43, #e75516);
  box-shadow: 0 4px 15px 0 rgba(252, 104, 110, 0.75);
  transition: all .4s ease-in-out;

  &:hover {
    background-position: 100% 0;
    transition: all .4s ease-in-out;
  }

  &:focus {
    outline: none;
  }
`;

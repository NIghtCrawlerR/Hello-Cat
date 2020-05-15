import styled from 'styled-components';

export const MainButton = styled.button`
  display: flex;
  align-items: center;
  min-width: 200px;
  height: 50px;
  margin: 10px;
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

  @media screen and (max-width: 768px) {
    min-width: 120px;
    height: 40px;
    font-size: 12px;
    padding: 5px 15px;
  }

  &:hover {
    background-position: 100% 0;
    transition: all .4s ease-in-out;
  }

  &:focus {
    outline: none;
  }
`;

export const TelegramButton = styled(MainButton)`
  justify-content: space-around;
  background-image: linear-gradient(to right, #25aae1, #4481eb, #04befe, #3f86ed);
  box-shadow: 0 4px 15px 0 rgba(52, 132, 217, 0.53);
`; 

export const MainWrap = styled.div`
  padding: 30px;
  border: 1px solid #cecece;
  border-radius: 4px;
  box-shadow: 0 0 15px 5px rgba(83, 67, 53, .24);
  background: rgba(255, 255, 255, .8);

  @media screen and (max-width: 768px) {
    padding: 15px;
  }
`;

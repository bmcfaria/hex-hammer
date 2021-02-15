import styled from 'styled-components';
import { ReactComponent as Hex } from '../assets/Hex.svg';

const Button = styled.button`
  position: absolute;
  top: 0;
  left: -20px;
  width: 50px;
  height: 60px;
  border: none;
  padding: 0;
  background: none;
  outline: none;
  z-index: 1;

  & > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    height: 100%;
    color: white;
  }

  &:hover > svg {
    color: blue;
  }
`;

const PauseButton = () => {
  return (
    <Button>
      <Hex />
    </Button>
  );
};

export default PauseButton;

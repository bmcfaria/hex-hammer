import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { incrementAction } from '../state/actions';
import { counterSelector } from '../state/selectors';
import { ReactComponent as HexRectangleFill } from '../assets/HexRectangleFill.svg';
import { ReactComponent as HexRectangleStroke } from '../assets/HexRectangleStroke.svg';

const Button = styled.button`
  position: relative;
  width: 310px;
  height: 100px;
  border: none;
  padding: 0;
  background: none;
  outline: none;
`;

const HexGrowing = styled(HexRectangleFill)<{ startAnimation: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  color: red;
  animation-name: ${({ startAnimation }) =>
    startAnimation ? 'hex-growing-animation' : 'none'};
  animation-duration: 0.5s;
  animation-timing-function: linear;

  @keyframes hex-growing-animation {
    from {
      clip-path: inset(0 100% 0 0);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }
`;

const HexBackground = styled(HexRectangleFill)`
  position: absolute;
  top: 0;
  left: 0;
  color: white;
`;

const HexBorder = styled(HexRectangleStroke)`
  position: absolute;
  top: 0;
  left: 0;
  color: blue;

  &:hover {
    color: white;
  }
`;

interface HammerButtonProps {
  onClickBaam: Function;
}

const HammerButton = ({ onClickBaam }: HammerButtonProps) => {
  const dispatch = useDispatch();
  const counter = useSelector(counterSelector);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    setStartAnimation(true);
  }, [counter]);

  const onClick = () => {
    if (startAnimation) {
      return;
    }

    onClickBaam();
    dispatch(incrementAction);
  };

  return (
    <Button onClick={onClick}>
      <HexBackground />
      <HexGrowing
        startAnimation={startAnimation}
        onAnimationEnd={() => {
          setStartAnimation(false);
        }}
      />
      <HexBorder />
    </Button>
  );
};

export default HammerButton;

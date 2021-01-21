import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { incrementAction } from '../state/actions';
import { counterSelector } from '../state/selectors';

const Button = styled.button`
  position: relative;
  width: 310px;
  height: 100px;
  border: none;
  padding: 0;
  background: none;
`;

const HexGrowing = styled.svg<{ startAnimation: boolean }>`
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

const HexBorder = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
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
      <HexBorder
        width="311"
        height="100"
        viewBox="0 0 311 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M311 50L296.83 75L282.264 99.7716L58.2675 100L29.5319 99.7716L14.9662 75L0.796232 50L14.9662 25L29.5319 0.228412L58.2675 -1.10473e-05L282.264 0.228415L296.83 25L311 50Z"
          fill="white"
        />
      </HexBorder>
      <HexGrowing
        width="311"
        height="100"
        viewBox="0 0 311 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        startAnimation={startAnimation}
        onAnimationEnd={() => {
          setStartAnimation(false);
        }}
      >
        <path
          d="M311 50L296.83 75L282.264 99.7716L58.2675 100L29.5319 99.7716L14.9662 75L0.796232 50L14.9662 25L29.5319 0.228412L58.2675 -1.10473e-05L282.264 0.228415L296.83 25L311 50Z"
          fill="currentColor"
        />
      </HexGrowing>
      <HexBorder
        width="311"
        height="100"
        viewBox="0 0 311 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M296.397 25.25L310.425 50L296.399 74.7466L296.395 74.7534L281.978 99.2719L58.2692 99.5L58.267 99.5L29.8192 99.2738L15.4012 74.7534L15.3972 74.7466L1.37097 50L15.3972 25.2534L15.4012 25.2465L29.8192 0.726144L58.267 0.499989L58.2692 0.499991L281.978 0.728124L296.397 25.25Z"
          stroke="black"
        />
      </HexBorder>
    </Button>
  );
};

export default HammerButton;

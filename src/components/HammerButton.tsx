import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { incrementAction } from '../state/actions';
import {
  autoSelector,
  counterSelector,
  lastCounterSelector,
} from '../state/selectors';
import { ReactComponent as HexRectangleFill } from '../assets/HexRectangleFill.svg';
import { ReactComponent as HexRectangleStroke } from '../assets/HexRectangleStroke.svg';
import { ReactComponent as Hex } from '../assets/Hex.svg';

const Button = styled.button`
  position: relative;
  width: 310px;
  height: 100px;
  border: none;
  padding: 0;
  background: none;
  outline: none;
`;

const HexGrowing = styled(HexRectangleFill)<{ $startAnimation: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  color: red;
  animation-name: ${({ $startAnimation }) =>
    $startAnimation ? 'hex-growing-animation' : 'none'};
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

const AutoContainer = styled.div`
  display: flex;
  position: absolute;
  top: 8px;
  right: 8px;
  width: auto;
  height: 84px;
`;

const AutoHex = styled(Hex)`
  width: auto;
  height: 84px;
  color: white;
`;

const AutoTex = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
`;

interface HammerButtonProps {
  sharedBabylonObject: any;
}

const HammerButton = ({ sharedBabylonObject }: HammerButtonProps) => {
  const dispatch = useDispatch();
  const counter = useSelector(counterSelector);
  const auto = useSelector(autoSelector);
  const lastCounter = useSelector(lastCounterSelector);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const countDown = setInterval(() => {
      if (auto && new Date().getTime() - lastCounter >= 1000) {
        dispatch(incrementAction);
      }
    }, 100);

    return () => {
      clearInterval(countDown);
    };
  }, [auto, dispatch, lastCounter]);

  useEffect(() => {
    setStartAnimation(true);

    if (sharedBabylonObject?.current?.mainAction) {
      sharedBabylonObject.current.mainAction();
    }
  }, [counter, sharedBabylonObject]);

  const onClick = () => {
    dispatch(incrementAction);

    if (startAnimation) {
      return;
    }
  };

  return (
    <Button onClick={onClick}>
      <HexBackground />
      <HexGrowing
        $startAnimation={startAnimation}
        onAnimationEnd={() => {
          setStartAnimation(false);
        }}
      />
      <HexBorder />
      {auto && (
        <AutoContainer>
          <AutoHex />
          <AutoTex>Auto</AutoTex>
        </AutoContainer>
      )}
    </Button>
  );
};

export default HammerButton;

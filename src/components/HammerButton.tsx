import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { incrementAction } from '../state/actions';
import {
  upgradeSelector,
  counterSelector,
  lastCounterSelector,
} from '../state/selectors';
import { ReactComponent as HexRectangle } from '../assets/HexRectangle.svg';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { upgrades } from '../helpers/values';

const Button = styled.button`
  position: relative;
  width: 310px;
  height: 100px;
  border: none;
  padding: 0;
  background: none;
  outline: none;
`;

const HexGrowing = styled(HexRectangle)<{ $startAnimation: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  fill: red;
  stroke: none;
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

const HexBackground = styled(HexRectangle)`
  position: absolute;
  top: 0;
  left: 0;
  fill: white;
  stroke: none;
`;

const HexBorder = styled(HexRectangle)`
  position: absolute;
  top: 0;
  left: 0;
  stroke: blue;

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
  const auto = useSelector(upgradeSelector('auto'));
  const lastCounter = useSelector(lastCounterSelector);
  const [startAnimation, setStartAnimation] = useState(false);
  const [autoTimeLeft, setAutoTimeLeft] = useState(upgrades.auto.value * 1000);

  useEffect(() => {
    const countDown = setInterval(() => {
      const tmpTimeLeft = new Date().getTime() - lastCounter;
      if (auto && tmpTimeLeft >= upgrades.auto.value * 1000) {
        dispatch(incrementAction);
      }
      setAutoTimeLeft(tmpTimeLeft);
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

  const diffTimeLeft = upgrades.auto.value * 1000 - autoTimeLeft;

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
          <AutoTex>
            Auto
            <br />
            {diffTimeLeft < 0 ? 0 : (diffTimeLeft / 1000).toFixed(1)}s
          </AutoTex>
        </AutoContainer>
      )}
    </Button>
  );
};

export default HammerButton;

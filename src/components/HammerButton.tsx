import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { incrementAction } from '../state/actions';
import { incrementalsSelector, tutorialSelector } from '../state/selectors';
import { ReactComponent as HexRectangle } from '../assets/HexRectangle.svg';
import { ReactComponent as HexRectangleWithShadow } from '../assets/HexRectangleWithShadow.svg';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { ReactComponent as Arrow } from '../assets/Arrow.svg';
import { upgrades } from '../helpers/values';
import { GameObjectContext } from '../helpers/context';
import theme, { resetButtonStyles } from '../helpers/theme';
import stringsObject from '../helpers/strings.json';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: auto;
  bottom: 60px;
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  ${resetButtonStyles}
  position: relative;
  width: 188px;
  height: auto;
  min-height: 60px;

  &:hover [data-button-shadow] {
    visibility: hidden;
  }

  @media only screen and (min-width: 768px) {
    width: 310px;
    min-height: 100px;
  }
`;

const HexGrowing = styled(HexRectangle)<{
  $startAnimation: boolean;
  $interval: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  fill: ${theme.colors.hammerButton.backgroundFill};
  stroke: none;
  animation-name: ${({ $startAnimation }) =>
    $startAnimation ? 'hex-growing-animation' : 'none'};
  animation-duration: ${({ $interval }) => $interval}s;
  animation-timing-function: linear;
  width: 100%;
  height: auto;

  @keyframes hex-growing-animation {
    from {
      clip-path: inset(0 100% 0 0);
    }
    to {
      clip-path: inset(0 0 0 0);
    }
  }
`;

const HexBackgroundShadow = styled(HexRectangleWithShadow)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
`;

const HexBackground = styled(HexRectangle)`
  position: absolute;
  top: 0;
  left: 0;
  fill: ${theme.colors.hammerButton.background};
  stroke: none;
  width: 100%;
  height: auto;
`;

const HexBorder = styled(HexRectangle)`
  position: absolute;
  top: 0;
  left: 0;
  stroke: ${theme.colors.hammerButton.border};
  width: 100%;
  height: auto;
`;

const AutoContainer = styled.div`
  display: flex;
  position: absolute;
  top: 4px;
  right: 4px;
  width: auto;
  height: calc(100% - 2 * 4px);

  @media only screen and (min-width: 768px) {
    top: 8px;
    right: 8px;
    height: calc(100% - 2 * 8px);
  }
`;

const AutoHex = styled(Hex)`
  width: auto;
  height: 100%;
  color: ${theme.colors.hammerButton.backgroundAuto};
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
  font-size: 16px;

  @media only screen and (min-width: 768px) {
    font-size: 18px;
  }
`;

const TutorialContainer = styled.div`
  position: absolute;
  left: 50%;
  bottom: 80px;
  width: 200px;
  height: auto;
  transform: translate(-50%);

  @media only screen and (min-width: 768px) {
    bottom: 124px;
  }
`;

const TutorialTextContainer = styled.div`
  max-width: 100%;
  padding: 20px;
  background-color: ${theme.colors.tutorial.textContainer.background};
  border: 4px solid ${theme.colors.tutorial.textContainer.border};
  margin-bottom: 16px;

  @media only screen and (min-width: 768px) {
    margin-bottom: 20px;
  }
`;

const ArrowStyled = styled(Arrow)`
  transform: rotate(135deg);
  height: auto;
`;

interface HammerButtonProps {
  sharedBabylonObject: any;
}

const HammerButton = ({ sharedBabylonObject }: HammerButtonProps) => {
  const dispatch = useDispatch();
  const incrementals = useSelector(incrementalsSelector);
  const { mainButton: showTutorial } = useSelector(tutorialSelector);

  const incrementalUpgrades =
    incrementals[sharedBabylonObject?.current?.selectedHex]?.upgrades;
  const autoValue = ~~incrementalUpgrades?.auto;

  const [longPressing, setLongPressing] = useState(false);

  const [startAnimation, setStartAnimation] = useState(false);
  const [autoTimeLeft, setAutoTimeLeft] = useState(0);
  const { scene } = useContext(GameObjectContext);

  const lastCounter =
    incrementals[sharedBabylonObject.current?.selectedHex]?.lastCounter;

  const interval =
    (upgrades.interval.value[~~incrementalUpgrades?.interval] || 1) * 1000;

  useEffect(() => {
    const countDown = setInterval(() => {
      if (autoValue > 0) {
        const tmpTimeLeft = new Date().getTime() - lastCounter;
        setAutoTimeLeft(tmpTimeLeft);

        if (upgrades.auto.value[autoValue - 1] * 1000 - tmpTimeLeft < 100) {
          setStartAnimation(true);
        }
      }
    }, 100);

    return () => {
      clearInterval(countDown);
    };
  }, [autoValue, dispatch, lastCounter, sharedBabylonObject]);

  useEffect(() => {
    let countDown: NodeJS.Timeout;
    if (longPressing) {
      countDown = setInterval(() => {
        const currentTime = new Date().getTime();
        if (currentTime - (lastCounter || 0) >= interval) {
          dispatch(incrementAction(sharedBabylonObject.current.selectedHex));

          setStartAnimation(true);
        }
      }, 100);
    }

    return () => {
      if (countDown) {
        clearInterval(countDown);
      }
    };
  }, [dispatch, interval, lastCounter, longPressing, sharedBabylonObject]);

  if (scene !== 'incremental') {
    return null;
  }

  let diffTimeLeft = 1;
  if (autoValue > 0) {
    diffTimeLeft = upgrades.auto.value[autoValue - 1] * 1000 - autoTimeLeft;
  }

  const onMouseDown = () => {
    const currentTime = new Date().getTime();
    if (currentTime - (lastCounter || 0) >= interval) {
      dispatch(incrementAction(sharedBabylonObject.current.selectedHex));

      setStartAnimation(true);
    }

    setLongPressing(true);
  };

  const onMouseUp = () => {
    setLongPressing(false);
  };

  return (
    <Container>
      <Button
        onMouseDown={onMouseDown}
        onTouchStart={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchEnd={onMouseUp}
      >
        <HexBackgroundShadow data-button-shadow />
        <HexBackground />
        <HexGrowing
          $startAnimation={startAnimation}
          $interval={interval / 1000}
          onAnimationEnd={() => {
            setStartAnimation(false);
          }}
        />
        <HexBorder />
        {autoValue > 0 && (
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
      {showTutorial && (
        <TutorialContainer>
          <TutorialTextContainer>
            {stringsObject.tutorial.mainButton}
          </TutorialTextContainer>
          <ArrowStyled />
        </TutorialContainer>
      )}
    </Container>
  );
};

export default HammerButton;

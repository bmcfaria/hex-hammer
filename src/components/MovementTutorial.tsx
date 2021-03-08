import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as Arrow } from '../assets/Arrow.svg';
import { GameObjectContext } from '../helpers/context';
import stringsObject from '../helpers/strings.json';
import theme from '../helpers/theme';
import { disableTutorialAction } from '../state/actions';
import { tutorialSelector } from '../state/selectors';

const BackgroundShadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: ${theme.colors.modal.backgroundShadow};
  z-index: ${theme.zIndex.modal};
  user-select: none;
`;

const ArrowStyled = styled(Arrow)`
  position: absolute;
  width: 48px;
  height: auto;
`;

const ArrowUp = styled(ArrowStyled)`
  top: calc(50% - 80px);
  left: calc(50%);
  transform: translate(-50%, -50%) rotate(-45deg);
`;

const ArrowDown = styled(ArrowStyled)`
  top: calc(50% + 80px);
  left: calc(50%);
  transform: translate(-50%, -50%) rotate(135deg);
`;

const ArrowLeft = styled(ArrowStyled)`
  top: calc(50%);
  left: calc(50% - 80px);
  transform: translate(-50%, -50%) rotate(225deg);
`;

const ArrowRight = styled(ArrowStyled)`
  top: calc(50%);
  left: calc(50% + 80px);
  transform: translate(-50%, -50%) rotate(45deg);
`;

const MovementText = styled.div`
  position: absolute;
  top: calc(50%);
  left: calc(50%);
  width: 70px;
  text-align: center;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 20px;
`;

const ArrowZoom = styled(ArrowStyled)`
  bottom: 60px;
  left: 68px;
  transform: rotate(180deg);
`;

const ZoomText = styled.div`
  position: absolute;
  bottom: 112px;
  left: 124px;
  color: white;
  font-size: 20px;
`;

const MovementTutorial = () => {
  const { scene } = useContext(GameObjectContext);
  const { secondStageMovement: secondStageMovementTutorial } = useSelector(
    tutorialSelector
  );
  const dispatch = useDispatch();

  if (scene !== 'secondStage' || !secondStageMovementTutorial) {
    return null;
  }

  const onClick = () => {
    dispatch(disableTutorialAction('secondStageMovement'));
  };

  return (
    <BackgroundShadow onClick={onClick}>
      <ArrowUp />
      <ArrowDown />
      <ArrowLeft />
      <ArrowRight />
      <MovementText>{stringsObject.tutorial.movement}</MovementText>

      <ArrowZoom />
      <ZoomText>{stringsObject.tutorial.zoom}</ZoomText>
    </BackgroundShadow>
  );
};

export default MovementTutorial;

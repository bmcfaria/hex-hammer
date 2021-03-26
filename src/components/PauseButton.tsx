import { MouseEvent, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as Pause } from '../assets/Pause.svg';
import { GameObjectContext } from '../helpers/context';
import theme from '../helpers/theme';
import useScene from '../hooks/useScene';
import {
  devAddFundsAction,
  resetAction,
  devToggleAction,
  increaseRealityAction,
} from '../state/actions';
import { devModeSelector } from '../state/selectors';
import StatusBarButton from './StatusBarButton';

const BackgroundShadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #0000007d;
  z-index: ${theme.zIndex.pauseModal};
`;

const ModalContainer = styled.div`
  width: 300px;
  height: 400px;
  padding: 16px;
  box-sizing: border-box;
  background-color: beige;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
`;

const Button = styled.button`
  display: block;
`;

const DevModeRow = styled.div`
  margin-top: 16px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const PauseButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { gameObject } = useContext(GameObjectContext);
  const devMode = useSelector(devModeSelector);
  const { resetSecondStage } = useScene();

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // const active = false;
  const close = () => {
    setModalOpen(false);
  };

  const reset = () => {
    dispatch(resetAction);
    gameObject?.current?.reset?.();
    close();
  };

  const toggleDev = () => {
    dispatch(devToggleAction);
  };

  const devAddFunds = () => {
    dispatch(devAddFundsAction);
  };

  const increateReality = () => {
    dispatch(increaseRealityAction);
  };

  return (
    <>
      {modalOpen && (
        <BackgroundShadow onClick={close}>
          <ModalContainer onClick={(e: MouseEvent) => e.stopPropagation()}>
            <div>
              <Button onClick={reset}>Reset</Button>
            </div>
            <DevModeRow>
              <span>Dev mode: {devMode ? 'ON' : 'OFF'}</span>
              <button onClick={toggleDev}>Toggle</button>
            </DevModeRow>
            <div>
              <Button onClick={devAddFunds}>DEV: add funds</Button>
            </div>
            <div>
              <Button onClick={increateReality}>DEV: increase reality</Button>
            </div>
            <div>
              <Button onClick={resetSecondStage}>
                DEV: reset second stage
              </Button>
            </div>
          </ModalContainer>
        </BackgroundShadow>
      )}

      <StatusBarButton
        side="left"
        active={modalOpen}
        onClick={toggleModal}
        customZIndex={theme.zIndex.pauseModal + 1}
      >
        <Pause />
      </StatusBarButton>
    </>
  );
};

export default PauseButton;

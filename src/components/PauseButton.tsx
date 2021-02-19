import { MouseEvent, useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as Pause } from '../assets/Pause.svg';
import { GameObjectContext } from '../helpers/context';
import theme from '../helpers/theme';
import { resetAction } from '../state/actions';
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
  background-color: beige;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  display: block;
  margin-top: 16px;
`;

const PauseButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { gameObject } = useContext(GameObjectContext);

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

  return (
    <>
      {modalOpen && (
        <BackgroundShadow onClick={close}>
          <ModalContainer onClick={(e: MouseEvent) => e.stopPropagation()}>
            <Button onClick={reset}>Reset</Button>
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

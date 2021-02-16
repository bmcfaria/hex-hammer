import { MouseEvent, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Pause } from '../assets/Pause.svg';
import theme from '../helpers/theme';
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
`;

const PauseButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };
  // const active = false;
  const close = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && (
        <BackgroundShadow onClick={close}>
          <ModalContainer
            onClick={(e: MouseEvent) => e.stopPropagation()}
          ></ModalContainer>
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

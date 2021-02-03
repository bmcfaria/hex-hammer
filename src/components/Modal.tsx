import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { modalHex, ModalHexTypes } from '../helpers/values';
import { buyModalHexAction } from '../state/actions';
import { modalHexSelector } from '../state/selectors';

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 400px;
  transform: translate(-50%, -50%);
  background-color: beige;
`;

const Name = styled.div``;
const Description = styled.div``;

interface ModalProps {
  sharedBabylonObject: any;
}

const Modal = ({ sharedBabylonObject }: ModalProps) => {
  const [modal, setModal] = useState<ModalHexTypes | undefined>();
  const dispatch = useDispatch();

  // Temporary
  const modalHexValues = useSelector(modalHexSelector);

  useEffect(() => {
    if (sharedBabylonObject.current) {
      sharedBabylonObject.current.modalHexValues = modalHexValues;
    }
  }, [sharedBabylonObject, modalHexValues]);

  useEffect(() => {
    if (!sharedBabylonObject.current?.ui?.openModal) {
      sharedBabylonObject.current.ui = {
        ...(sharedBabylonObject.current.ui || {}),
      };
    }

    sharedBabylonObject.current.ui.openModal = (modalId: ModalHexTypes) => {
      setModal(modalId);
    };
  }, [sharedBabylonObject]);

  const buy = () => {
    if (modal) {
      dispatch(buyModalHexAction(modal));
    }
  };

  const close = () => {
    setModal(undefined);
  };

  if (!modal) {
    return null;
  }

  const modalInfo = modalHex[modal];

  return (
    <Container>
      <Name>{modalInfo.name}</Name>
      <Description>{modalInfo.description}</Description>
      <div>
        <button onClick={buy}>{modalInfo.price}</button>
        <button onClick={close}>Close</button>
      </div>
    </Container>
  );
};

export default Modal;

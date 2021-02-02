import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Hex } from '../assets/Hex.svg';

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 400px;
  transform: translate(-50%, -50%);
  background-color: beige;
`;

interface ModalProps {
  sharedBabylonObject: any;
}

const Modal = ({ sharedBabylonObject }: ModalProps) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log('testing');
    console.log(sharedBabylonObject.current);

    if (!sharedBabylonObject.current?.ui?.modal) {
      sharedBabylonObject.current.ui = {
        ...(sharedBabylonObject.current.ui || {}),
      };
    }

    sharedBabylonObject.current.ui.openModal = () => {
      setOpen(true);
    };
  }, [sharedBabylonObject]);

  const close = () => {
    sharedBabylonObject.current.ui.modal = false;
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <Container>
      Something
      <button onClick={close}>Close</button>
    </Container>
  );
};

export default Modal;

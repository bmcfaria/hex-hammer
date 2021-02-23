import React from 'react';
import { MouseEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GameObjectRefType } from '../helpers/types';
import { modalHex, ModalHexType } from '../helpers/values';
import { incrementalsSelector, modalHexSelector } from '../state/selectors';
import ModalExpand from './ModalExpand';
import ModalTrade from './ModalTrade';
import ModalUnlock from './ModalUnlock';

const BackgroundShadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #0000007d;
`;

const Container = styled.div`
  width: 300px;
  height: 400px;
  background-color: beige;
  margin: auto;
`;

const Name = styled.div``;
const Description = styled.div``;

interface ModalProps {
  sharedBabylonObject: { current?: GameObjectRefType };
}

const Modal = ({ sharedBabylonObject }: ModalProps) => {
  const [modal, setModal] = useState<ModalHexType | undefined>();
  const incrementals = useSelector(incrementalsSelector);

  const modalHexValues = useSelector(modalHexSelector);

  useEffect(() => {
    if (sharedBabylonObject.current) {
      sharedBabylonObject.current.modalHexValues = modalHexValues;
    }
  }, [sharedBabylonObject, modalHexValues]);

  useEffect(() => {
    if (sharedBabylonObject.current) {
      if (!sharedBabylonObject.current?.ui?.openModal) {
        sharedBabylonObject.current.ui.openModal = (modalId: ModalHexType) => {
          setModal(modalId);
        };
      }

      sharedBabylonObject.current.ui.openIncremental = selectedHex => {
        if (
          incrementals[selectedHex]?.unlocked ||
          !modalHex[selectedHex as ModalHexType]
        ) {
          sharedBabylonObject?.current?.changeScene?.(
            'incremental',
            selectedHex
          );
        } else {
          sharedBabylonObject.current?.ui.openModal(
            selectedHex as ModalHexType
          );
        }
      };
    }
  }, [incrementals, modal, sharedBabylonObject]);

  const close = () => {
    setModal(undefined);
  };

  if (!modal) {
    return null;
  }

  const modalInfo = modalHex[modal];

  return (
    <BackgroundShadow onClick={close}>
      <Container onClick={(e: MouseEvent) => e.stopPropagation()}>
        <Name>{modalInfo.title}</Name>
        <Description>{modalInfo.description}</Description>
        {modalInfo.type === 'expand' && <ModalExpand modal={modal} />}
        {modalInfo.type === 'trade' && <ModalTrade modal={modal} />}
        {modalInfo.type === 'unlock' && <ModalUnlock modal={modal} />}
      </Container>
    </BackgroundShadow>
  );
};

export default Modal;

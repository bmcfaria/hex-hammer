import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { GameObjectRefType } from '../helpers/types';
import { modalHex, ModalHexType } from '../helpers/values';
import { incrementalsSelector, modalHexSelector } from '../state/selectors';
import BaseModal from './BaseModal';
import ModalExpand from './ModalExpand';
import ModalTrade from './ModalTrade';
import ModalUnlock from './ModalUnlock';

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
    <BaseModal open={!!modal} close={close}>
      <Name>{modalInfo.title}</Name>
      <Description>{modalInfo.description}</Description>
      {modalInfo.type === 'expand' && <ModalExpand modal={modal} />}
      {modalInfo.type === 'trade' && <ModalTrade modal={modal} />}
      {modalInfo.type === 'unlock' && <ModalUnlock modal={modal} />}
    </BaseModal>
  );
};

export default Modal;

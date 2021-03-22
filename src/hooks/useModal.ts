import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GameObjectContext, ModalContext } from '../helpers/context';
import { modalsHex } from '../helpers/modals';
import { ModalHexType } from '../helpers/types';
import { incrementalsSelector, modalHexSelector } from '../state/selectors';
import useScene from './useScene';

const useModal = () => {
  const { modal, setModal } = useContext(ModalContext);
  const { openIncremental } = useScene();
  const incrementals = useSelector(incrementalsSelector);

  const modalHexValues = useSelector(modalHexSelector);
  const { gameObject } = useContext(GameObjectContext);

  useEffect(() => {
    if (gameObject?.current) {
      gameObject.current.modalHexValues = modalHexValues;
    }
  }, [gameObject, modalHexValues]);

  useEffect(() => {
    if (gameObject?.current && setModal) {
      if (!gameObject.current?.ui?.openModal) {
        gameObject.current.ui.openModal = (modalId: ModalHexType) => {
          setModal(modalId);
        };
      }

      gameObject.current.ui.openIncremental = selectedHex => {
        if (
          incrementals[selectedHex]?.unlocked ||
          !modalsHex[selectedHex as ModalHexType]
        ) {
          openIncremental(selectedHex);
        } else {
          gameObject.current?.ui.openModal(selectedHex as ModalHexType);
        }
      };
    }
  }, [incrementals, gameObject, setModal, openIncremental]);

  const openModal = (modalKey: ModalHexType) => {
    setModal?.(modalKey);
  };

  const closeModal = () => {
    setModal?.(undefined);
  };

  return {
    modal,
    openModal,
    closeModal,
  };
};

export default useModal;

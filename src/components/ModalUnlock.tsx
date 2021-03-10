import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CurrencyType, ModalHexType } from '../helpers/types';
import { modalsHex } from '../helpers/modals';
import { butModalUnlockAction } from '../state/actions';
import { currencySelector } from '../state/selectors';
import ButtonHex from './ButtonHex';
import ModalInfo from './ModalInfo';
import useModal from '../hooks/useModal';
import useScene from '../hooks/useScene';

const Container = styled.div`
  width: 100%;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

interface ModalUnlockProps {
  modal: ModalHexType;
}

const ModalUnlock = ({ modal }: ModalUnlockProps) => {
  const dispatch = useDispatch();
  const currencies = useSelector(currencySelector);
  const { closeModal } = useModal();
  const { openIncremental } = useScene();

  const modalInfo = modalsHex[modal];
  if (!modalInfo || modalInfo.type !== 'unlock') {
    return null;
  }

  const price = modalInfo.prices[0];
  const enoughtMoney = currencies[modalInfo.currency] >= price;

  const buy = () => {
    if (enoughtMoney) {
      dispatch(
        butModalUnlockAction({
          modalId: modal,
        })
      );

      // close modal and open incremental
      closeModal();
      openIncremental(modal);
    }
  };

  return (
    <Container>
      <ModalInfo selectedHex={modal} />
      <ButtonHex
        onClick={buy}
        disabled={!enoughtMoney}
        currency={modalInfo.currency as CurrencyType}
        price={price}
      />
    </Container>
  );
};

export default ModalUnlock;

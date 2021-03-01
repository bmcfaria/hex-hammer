import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CurrencyType } from '../helpers/types';
import { modalHex, ModalHexType } from '../helpers/values';
import { buyModalHexAction } from '../state/actions';
import { currencySelector } from '../state/selectors';
import ButtonHex from './ButtonHex';
import ModalInfo from './ModalInfo';

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
  const currency = useSelector(currencySelector);

  const modalInfo = modalHex[modal];
  if (!modalInfo || modalInfo.type !== 'unlock') {
    return null;
  }

  const buy = (index: number) => () => {
    if (modal) {
      dispatch(
        buyModalHexAction({
          modalId: modal,
          priceIndex: index,
          currency: modalInfo.currency as CurrencyType,
        })
      );
    }
  };

  return (
    <Container>
      <ModalInfo selectedHex={modal} />
      <ButtonHex
        onClick={buy(0)}
        disabled={currency[modalInfo.currency] < modalInfo.prices[0]}
        currency={modalInfo.currency as CurrencyType}
        price={modalInfo.prices[0]}
      />
    </Container>
  );
};

export default ModalUnlock;

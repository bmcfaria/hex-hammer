import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CurrencyType } from '../helpers/types';
import { modalHex, ModalHexTypes } from '../helpers/values';
import { buyModalHexAction } from '../state/actions';
import { currencySelector } from '../state/selectors';
import ModalItem from './ModalItem';

const Container = styled.div`
  color: black;
`;

interface ModalUnlockProps {
  modal: ModalHexTypes;
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
      {(modalInfo.prices as []).map((_, index) => (
        <React.Fragment key={index}>
          <ModalItem
            text="Unlock"
            price={modalInfo.prices[index]}
            onClick={buy(index)}
            disabled={currency[modalInfo.currency] < modalInfo.prices[index]}
            currency={modalInfo.currency as CurrencyType}
          />
          <br />
        </React.Fragment>
      ))}
    </Container>
  );
};

export default ModalUnlock;

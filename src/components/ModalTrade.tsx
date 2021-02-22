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

interface ModalTradeProps {
  modal: ModalHexTypes;
}

const ModalTrade = ({ modal }: ModalTradeProps) => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);

  const buy = (index: number) => () => {
    if (modal) {
      dispatch(
        buyModalHexAction({
          modalId: modal,
          priceIndex: (modalInfo as any).convertTo,
        })
      );
    }
  };

  const modalInfo = modalHex[modal];
  if (!modalInfo || modalInfo.type !== 'trade') {
    return null;
  }

  return (
    <Container>
      {(modalInfo.prices as []).map((_, index) => (
        <React.Fragment key={index}>
          <ModalItem
            text={`x ${10 ** index}`}
            price={modalInfo.prices[index]}
            onClick={buy(index)}
            disabled={currency[modalInfo.currency] < modalInfo.prices[index]}
            currency={modalInfo.currency as CurrencyType}
            convertTo={(modalInfo as any).convertTo}
          />
          <br />
        </React.Fragment>
      ))}
    </Container>
  );
};

export default ModalTrade;

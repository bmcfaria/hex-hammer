import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme, { resetButtonStyles } from '../helpers/theme';
import { CurrencyType, ModalHexType } from '../helpers/types';
import { modalsHex } from '../helpers/modals';
import { butModalTradeAction } from '../state/actions';
import { currencySelector } from '../state/selectors';
import { ReactComponent as ArrowsConversion } from '../assets/ArrowsConversion.svg';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import ModalItem from './ModalItem';

const Container = styled.div`
  width: 100%;
`;

const Description = styled.div`
  width: 100%;
  height: 32px;
  border-top: 1px solid ${theme.colors.modal.border};
  color: black;
  box-sizing: border-box;
  padding: 0 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MultiplierContainer = styled.div`
  width: 100%;
  height: 62px;
  border-top: 1px solid ${theme.colors.modal.border};
  display: flex;
  justify-content: center;
`;

const MultiplierButton = styled.button<{ $active: boolean }>`
  ${resetButtonStyles}
  width: 80px;
  height: 32px;
  border: 2px solid ${theme.colors.modal.border};
  margin: 14px 6px;
  ${theme.boxShadow}

  ${({ $active }) => ($active ? 'box-shadow: none;' : '')}
  ${({ $active }) =>
    $active
      ? `background-color: ${theme.colors.modal.backgroundSecondary};`
      : ''}

  &:hover {
    box-shadow: none;
  }
`;

const TradeButtonContainer = styled.div`
  width: 100%;
  height: 88px;
  background-color: white;
  border-top: 1px solid ${theme.colors.modal.border};
  display: flex;
  align-items: center;
  color: black;
`;

const HexStyled = styled(Hex)<{ $currency: CurrencyType }>`
  width: auto;
  height: 24px;
  ${({ $currency }) => `color: ${theme.currencyColors[$currency]};`}
`;

interface ModalTradeProps {
  modal: ModalHexType;
}

const ModalTrade = ({ modal }: ModalTradeProps) => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const [multiplier, setMultiplier] = useState(1);

  const modalInfo = modalsHex[modal];
  if (!modalInfo || modalInfo.type !== 'trade') {
    return null;
  }

  const buy = (invert: boolean) => () => {
    dispatch(
      butModalTradeAction({
        modalId: modal,
        multiplier,
        invert,
      })
    );
  };

  const convertFrom = modalInfo.currency as CurrencyType;
  const convertTo = modalInfo.convertTo;

  const rate = modalInfo.rate;

  return (
    <Container>
      <Description>
        <HexStyled $currency={convertFrom} />
        <ArrowsConversion />
        <HexStyled $currency={convertTo} />
      </Description>
      <MultiplierContainer>
        <MultiplierButton
          $active={multiplier === 1}
          onClick={() => {
            setMultiplier(1);
          }}
        >
          x1
        </MultiplierButton>
        <MultiplierButton
          $active={multiplier === 10}
          onClick={() => {
            setMultiplier(10);
          }}
        >
          x10
        </MultiplierButton>
        <MultiplierButton
          $active={multiplier === 100}
          onClick={() => {
            setMultiplier(100);
          }}
        >
          x100
        </MultiplierButton>
      </MultiplierContainer>
      <TradeButtonContainer>
        <ModalItem
          text={`x ${multiplier}`}
          price={rate * multiplier}
          onClick={buy(false)}
          disabled={currency[convertFrom] < rate * multiplier}
          currency={convertFrom}
          convertTo={convertTo}
        />
      </TradeButtonContainer>
      <TradeButtonContainer>
        <ModalItem
          text={`x ${rate * multiplier}`}
          price={multiplier}
          onClick={buy(true)}
          disabled={currency[convertTo] < multiplier}
          currency={convertTo}
          convertTo={convertFrom}
        />
      </TradeButtonContainer>
    </Container>
  );
};

export default ModalTrade;

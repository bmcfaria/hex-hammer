import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from '../helpers/theme';
import { CurrencyType } from '../helpers/types';
import { modalHex, ModalHexType } from '../helpers/values';
import { buyModalHexAction } from '../state/actions';
import { currencySelector } from '../state/selectors';
import ModalItem from './ModalItem';

const Description = styled.div`
  width: 100%;
  height: 32px;
  text-align: center;
  font-size: 16px;
  line-height: 32px;
  border-top: 1px solid ${theme.colors.modal.border};
  border-bottom: 1px solid ${theme.colors.modal.border};
`;

const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${theme.colors.modal.backgroundSecondary};
  padding-bottom: 40px;
`;

const UpgradeButtonContainer = styled.div`
  margin-top: 16px;
  width: 100%;
  height: 60px;
  background-color: white;
  border-top: 4px solid ${theme.colors.upgradeButtons.border};
  border-bottom: 4px solid ${theme.colors.upgradeButtons.border};
  display: flex;
  color: black;
`;

interface ModalTradeProps {
  modal: ModalHexType;
}

const ModalTrade = ({ modal }: ModalTradeProps) => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);

  const modalInfo = modalHex[modal];
  if (!modalInfo || modalInfo.type !== 'trade') {
    return null;
  }

  const buy = (index: number) => () => {
    if (modal) {
      dispatch(
        buyModalHexAction({
          modalId: modal,
          priceIndex: index,
          currency: (modalInfo as any).currency,
          convertTo: (modalInfo as any).convertTo,
        })
      );
    }
  };

  return (
    <>
      <Description>{modalInfo.description}</Description>
      <ContentContainer>
        {(modalInfo.prices as []).map((_, index) => (
          <UpgradeButtonContainer key={index}>
            <ModalItem
              text={`x ${10 ** index}`}
              price={modalInfo.prices[index]}
              onClick={buy(index)}
              disabled={currency[modalInfo.currency] < modalInfo.prices[index]}
              currency={modalInfo.currency as CurrencyType}
              convertTo={(modalInfo as any).convertTo}
            />
          </UpgradeButtonContainer>
        ))}
      </ContentContainer>
    </>
  );
};

export default ModalTrade;

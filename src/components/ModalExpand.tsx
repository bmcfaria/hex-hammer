import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from '../helpers/theme';
import { CurrencyType, ModalHexType } from '../helpers/types';
import { modalsHex } from '../helpers/modals';
import { buyModalExpandAction } from '../state/actions';
import { currencySelector, modalHexUpgradeSelector } from '../state/selectors';
import { ReactComponent as Ring0 } from '../assets/Ring0.svg';
import { ReactComponent as Ring1 } from '../assets/Ring1.svg';
import { ReactComponent as Ring2 } from '../assets/Ring2.svg';
import ButtonHex from './ButtonHex';
import stringsObject from '../helpers/strings.json';

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
`;

const Level = styled.div`
  width: 100%;
  height: 32px;
  text-align: center;
  font-size: 16px;
  line-height: 32px;
`;

const HexRingsContainer = styled.div`
  width: 100%;
  height: 120px;
  position: relative;
`;

const BlinkRing = styled.div<{ $blink: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${({ $blink }) =>
    $blink ? 'blinck-ring 1s ease infinite alternate-reverse' : 'none'};

  @keyframes blinck-ring {
    100% {
      opacity: 0.1;
    }
  }
`;

const Ring0Styled = styled(Ring0)`
  fill: ${theme.colors.modal.expandHex};
`;

const ButtonContainer = styled.div`
  min-height: 40px;
  margin-top: 8px;
  margin-bottom: 32px;

  & > [data-button-all-bought] {
    height: 40px;
    line-height: 40px;
  }
`;

interface ModalExpandProps {
  modal: ModalHexType;
}

const ModalExpand = ({ modal }: ModalExpandProps) => {
  const dispatch = useDispatch();
  const currencies = useSelector(currencySelector);

  const modalHexUpgradeValues = useSelector(modalHexUpgradeSelector);

  const buy = () => {
    if (modal) {
      dispatch(
        buyModalExpandAction({
          modalId: modal,
          priceIndex: 0,
          currency: modalInfo.currency as CurrencyType,
        })
      );
    }
  };

  const modalInfo = modalsHex[modal];
  if (!modalInfo || modalInfo.type !== 'expand') {
    return null;
  }

  const currentLevel = ~~modalHexUpgradeValues[modal];
  const currentCurrency = modalInfo.currency as CurrencyType;

  return (
    <>
      <Description>{modalInfo.description}</Description>
      <ContentContainer>
        <Level>
          {`Level ${currentLevel}`}
          {modalInfo.prices.length >= currentLevel + 1
            ? ` -> ${currentLevel + 1}`
            : ''}
        </Level>
        <HexRingsContainer>
          <BlinkRing $blink={false}>
            <Ring0Styled />
          </BlinkRing>
          {currentLevel >= 0 && (
            <BlinkRing $blink={currentLevel === 0}>
              <Ring1 />
            </BlinkRing>
          )}
          {currentLevel >= 1 && (
            <BlinkRing $blink={currentLevel === 1}>
              <Ring2 />
            </BlinkRing>
          )}
        </HexRingsContainer>
        <ButtonContainer>
          {modalInfo.prices.length > currentLevel && (
            <ButtonHex
              onClick={buy}
              currency={currentCurrency}
              disabled={
                currencies[currentCurrency] < modalInfo.prices[currentLevel]
              }
              price={modalInfo.prices[currentLevel]}
            />
          )}
          {modalInfo.prices.length <= currentLevel && (
            <div data-button-all-bought>
              {stringsObject.modal.expand.buttonAllBought}
            </div>
          )}
        </ButtonContainer>
      </ContentContainer>
    </>
  );
};

export default ModalExpand;

import styled from 'styled-components';
import { ReactComponent as HexRectangle } from '../assets/HexRectangle.svg';
import { ReactComponent as ArrowsConversion } from '../assets/ArrowsConversion.svg';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import theme, { resetButtonStyles } from '../helpers/theme';
import { CurrencyType, ModalHexType } from '../helpers/types';
import { modalsHex } from '../helpers/modals';
import useModal from '../hooks/useModal';

const ButtonContainer = styled.button<{ $disabled: boolean }>`
  ${resetButtonStyles}
  width: 208px;
  height: 68px;
  background-color: ${({ $disabled }) =>
    $disabled
      ? theme.colors.upgradeButtons.containerBackgroundDisabled
      : theme.colors.upgradeButtons.containerBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  position: relative;
  ${({ $disabled }) => ($disabled ? 'cursor: unset;' : '')}

  &:hover [data-button-hex-background] {
    ${({ $disabled }) =>
      $disabled
        ? 'cursor: unset;'
        : `stroke: ${theme.colors.upgradeButtons.borderHover};`}
  }
`;

const HexRectangleStyled = styled(HexRectangle)`
  position: absolute;
  width: auto;
  height: 60px;
  fill: white;
`;

const InfoContainer = styled.div`
  width: 186px;
  height: 60px;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 44px;
  z-index: 1;
`;

const HexStyled = styled(Hex)<{ $currency: CurrencyType }>`
  width: auto;
  height: 24px;
  ${({ $currency }) => `color: ${theme.currencyColors[$currency]};`}
`;

interface TradeButtonProps {
  modalKey: ModalHexType;
}

const TradeButton = ({ modalKey }: TradeButtonProps) => {
  const { openModal } = useModal();

  const modalInfo = modalsHex[modalKey];
  if (!modalInfo || modalInfo.type !== 'trade') {
    return null;
  }

  const convertFrom = modalInfo.currency as CurrencyType;
  const convertTo = modalInfo.convertTo as CurrencyType;

  const onClick = () => {
    openModal(modalKey);
  };

  return (
    <ButtonContainer onClick={onClick} $disabled={false} disabled={false}>
      <HexRectangleStyled data-button-hex-background />
      <InfoContainer>
        <HexStyled $currency={convertFrom} />
        <ArrowsConversion />
        <HexStyled $currency={convertTo} />
      </InfoContainer>
    </ButtonContainer>
  );
};

export default TradeButton;

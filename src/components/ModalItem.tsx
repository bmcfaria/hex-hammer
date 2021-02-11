import styled from 'styled-components';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { ReactComponent as HexRectangle } from '../assets/HexRectangle.svg';
import { CurrenciesTypes } from '../helpers/types';
import theme from '../helpers/theme';

const ButtonContainer = styled.button`
  width: auto;
  height: 40px;
  border: none;
  padding: 0;
  background: none;
  outline: none;
  position: relative;
  vertical-align: top;
`;

const HexRectangleStyled = styled(HexRectangle)`
  width: auto;
  height: 100%;
  fill: white;
`;

const HexStyled = styled(Hex)<{ $currency: CurrenciesTypes }>`
  width: auto;
  height: 20px;
  margin-right: 2px;
  ${({ $currency }) => `color: ${theme.currencyColors[$currency]};`}
`;

const ItemContainer = styled.div<{ $disabled?: boolean; $bought: boolean }>`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  ${({ $disabled }) => ($disabled ? 'background-color: gray;' : '')}
  ${({ $bought }) => ($bought ? 'background-color: green;' : '')}

  & [data-button-hex-background] {
    ${({ $disabled }) => ($disabled ? 'stroke: gray;' : '')}
  }
`;

const LabelContainer = styled.div`
  display: flex;
  width: 124px;
  justify-content: center;
`;

const ItemText = styled.div``;

const PriceContainer = styled.div<{ $currency: CurrenciesTypes }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  color: black;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 20px;
  line-height: 20px;
  padding: 0 12px;
  box-sizing: border-box;

  & > svg {
    width: auto;
    height: 20px;
    margin-right: 2px;
    ${({ $currency }) => `color: ${theme.currencyColors[$currency]};`}
  }

  & > span {
    flex-grow: 1;
  }
`;

interface ModalItemProps {
  text?: string;
  modalId?: string;
  price: number;
  onClick: any;
  bought?: boolean;
  disabled: boolean;
  currency: CurrenciesTypes;
  convertTo?: CurrenciesTypes;
}

const ModalItem = ({
  text,
  modalId,
  price,
  onClick,
  bought,
  disabled,
  currency,
  convertTo,
}: ModalItemProps) => {
  return (
    <ItemContainer $disabled={disabled} $bought={!!bought}>
      <LabelContainer>
        {convertTo && <HexStyled $currency={convertTo} />}
        <ItemText>{text}</ItemText>
      </LabelContainer>
      {!bought && (
        <ButtonContainer onClick={onClick} disabled={disabled || bought}>
          <HexRectangleStyled data-button-hex-background />
          <PriceContainer $currency={currency}>
            <Hex />
            <span>{price}</span>
          </PriceContainer>
        </ButtonContainer>
      )}
    </ItemContainer>
  );
};

export default ModalItem;

import styled from 'styled-components';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { ReactComponent as HexRectangle } from '../assets/HexRectangle.svg';
import theme, { resetButtonStyles } from '../helpers/theme';
import { CurrencyType } from '../helpers/types';

const ButtonContainer = styled.button`
  ${resetButtonStyles}
  width: auto;
  height: 40px;
  position: relative;
  vertical-align: top;
`;

const HexRectangleStyled = styled(HexRectangle)`
  width: auto;
  height: 100%;
  fill: white;
`;

const PriceContainer = styled.div<{ $currency: CurrencyType }>`
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

interface ButtonHexProps {
  onClick: () => void;
  disabled?: boolean;
  bought?: boolean;
  currency: CurrencyType;
  price: number;
}

const ButtonHex = ({
  onClick,
  disabled,
  bought,
  currency,
  price,
}: ButtonHexProps) => {
  return (
    <ButtonContainer onClick={onClick} disabled={disabled || bought}>
      <HexRectangleStyled data-button-hex-background />
      <PriceContainer $currency={currency}>
        <Hex />
        <span>{price}</span>
      </PriceContainer>
    </ButtonContainer>
  );
};

export default ButtonHex;

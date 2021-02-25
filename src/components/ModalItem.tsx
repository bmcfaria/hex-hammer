import styled from 'styled-components';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { CurrencyType } from '../helpers/types';
import theme from '../helpers/theme';
import ButtonHex from './ButtonHex';

const HexStyled = styled(Hex)<{ $currency: CurrencyType }>`
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

interface ModalItemProps {
  text?: string;
  price: number;
  onClick: any;
  bought?: boolean;
  disabled: boolean;
  currency: CurrencyType;
  convertTo?: CurrencyType;
}

const ModalItem = ({
  text,
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
        <ButtonHex
          onClick={onClick}
          disabled={disabled}
          bought={bought}
          currency={currency}
          price={price}
        />
      )}
    </ItemContainer>
  );
};

export default ModalItem;

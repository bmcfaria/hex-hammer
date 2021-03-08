import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { buyUpgradeAction } from '../state/actions';
import { currencySelector, incrementalsSelector } from '../state/selectors';
import { upgrades, UpgradeType } from '../helpers/values';
import { ReactComponent as HexRectangle } from '../assets/HexRectangle.svg';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import theme, { resetButtonStyles } from '../helpers/theme';
import { CurrencyType } from '../helpers/types';
import { formatMoney } from '../helpers/utils';

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
  padding: 0 16px;
  z-index: 1;
`;

const PriceContainer = styled.div`
  width: 56px;
  display: flex;
  align-items: center;
  margin-right: 16px;

  & > span {
    flex-grow: 1;
  }
`;

const TextContainer = styled.div`
  width: 88px;
  margin-left: 16px;
  flex-grow: 1;
`;

const Description1 = styled.div`
  font-size: 16px;
`;

const Description2 = styled.div`
  font-size: 14px;
`;

const HexStyled = styled(Hex)<{ $currency: CurrencyType }>`
  width: auto;
  height: 20px;
  margin-right: 2px;
  ${({ $currency }) => `color: ${theme.currencyColors[$currency]};`}
`;

interface UpgradeButtonProps {
  upgradeId: UpgradeType;
  selectedHex: string;
}

const UpgradeButton = ({ upgradeId, selectedHex }: UpgradeButtonProps) => {
  const currencies = useSelector(currencySelector);
  const incrementals = useSelector(incrementalsSelector);

  const dispatch = useDispatch();

  const incrementalUpgrades = incrementals[selectedHex]?.upgrades;

  const upgradeValue = ~~incrementalUpgrades?.[upgradeId];

  const { price: priceArray, description1, description2, currency } = upgrades[
    upgradeId
  ];
  const price = priceArray[upgradeValue];

  const name =
    description1.length > 1 ? description1[upgradeValue] : description1[0];

  const description =
    description2.length > 1 ? description2[upgradeValue] : description2[0];

  const onClick = () => {
    dispatch(buyUpgradeAction(selectedHex, upgradeId));
  };

  return (
    <ButtonContainer
      onClick={onClick}
      $disabled={currencies[currency] < price || !price}
      disabled={currencies[currency] < price}
    >
      <HexRectangleStyled data-button-hex-background />
      <InfoContainer>
        <TextContainer>
          <Description1>{name}</Description1>
          <Description2>{description}</Description2>
        </TextContainer>
        <PriceContainer>
          <HexStyled $currency={currency as CurrencyType} />
          <span>{price >= 0 ? formatMoney(price) : '?'}</span>
        </PriceContainer>
      </InfoContainer>
    </ButtonContainer>
  );
};

export default UpgradeButton;

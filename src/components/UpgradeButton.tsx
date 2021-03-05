import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { buyUpgradeAction } from '../state/actions';
import { currencySelector, incrementalsSelector } from '../state/selectors';
import { upgrades, UpgradeType } from '../helpers/values';
import { ReactComponent as HexRectangle } from '../assets/HexRectangle.svg';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import theme, { resetButtonStyles } from '../helpers/theme';
import { CurrencyType } from '../helpers/types';

const ButtonContainer = styled.button`
  ${resetButtonStyles}
  width: 208px;
  height: 68px;
  background-color: ${theme.colors.upgradeButtons.containerBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  position: relative;

  &:hover [data-button-hex-background] {
    stroke: ${theme.colors.upgradeButtons.borderHover};
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
  z-index: 1;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 8px;
`;

const TextContainer = styled.div`
  width: 88px;
  margin-right: 20px;
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

  const onClick = () => {
    dispatch(buyUpgradeAction(selectedHex, upgradeId));
  };

  return (
    <ButtonContainer onClick={onClick} disabled={currencies[currency] < price}>
      <HexRectangleStyled data-button-hex-background />
      <InfoContainer>
        <PriceContainer>
          <HexStyled $currency={currency as CurrencyType} />
          <span>{price}</span>
        </PriceContainer>
        <TextContainer>
          <Description1>
            {description1.length > 1
              ? description1[upgradeValue]
              : description1[0]}
          </Description1>
          <Description2>
            {description2.length > 1
              ? description2[upgradeValue]
              : description2[0]}
          </Description2>
        </TextContainer>
      </InfoContainer>
    </ButtonContainer>
  );
};

export default UpgradeButton;

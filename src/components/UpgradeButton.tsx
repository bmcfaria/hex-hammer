import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { buyUpgradeAction } from '../state/actions';
import {
  currencySelector,
  incrementalsSelector,
  upgradesSelector,
} from '../state/selectors';
import { upgrades, UpgradeKeyType } from '../helpers/values';
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
      $disabled ? '' : `stroke: ${theme.colors.upgradeButtons.borderHover};`}
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
  width: 72px;
  display: flex;
  align-items: center;
  text-align: left;

  & > span {
    padding-left: 4px;
    flex-grow: 1;
  }
`;

const LockedContainer = styled.div`
  width: 68px;
  margin-left: 4px;
  text-align: left;
`;

const TextContainer = styled.div`
  width: 88px;
  /* margin-left: 16px; */
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
  upgradeId: UpgradeKeyType;
  selectedHex: string;
}

const UpgradeButton = ({ upgradeId, selectedHex }: UpgradeButtonProps) => {
  const currencies = useSelector(currencySelector);
  const incrementals = useSelector(incrementalsSelector);
  const upgradesState = useSelector(upgradesSelector);

  const dispatch = useDispatch();

  const incrementalUpgrades = incrementals[selectedHex]?.upgrades;

  const upgradeValue = ~~incrementalUpgrades?.[upgradeId];

  const {
    price: priceArray,
    description1,
    description2,
    currency,
    levelLock,
  } = upgrades[upgradeId];
  const price = priceArray[upgradeValue];

  const currentLockLevel = upgradesState[upgradeId]?.levelLock || 0;
  const isLocked = upgradeValue + 1 >= levelLock[currentLockLevel];

  const maxLevel = priceArray.length <= upgradeValue;

  const name =
    description1.length > 1 ? description1[upgradeValue] : description1[0];

  const description =
    description2.length > 1 ? description2[upgradeValue] : description2[0];

  const onClick = () => {
    if (!maxLevel && !isLocked) {
      dispatch(buyUpgradeAction(selectedHex, upgradeId));
    }
  };

  const disabled = (currencies[currency] || 0) < price || !price || isLocked;

  return (
    <ButtonContainer onClick={onClick} $disabled={disabled} disabled={disabled}>
      <HexRectangleStyled data-button-hex-background />
      <InfoContainer>
        <TextContainer>
          <Description1>{name}</Description1>
          <Description2>{description}</Description2>
        </TextContainer>
        {!isLocked && !maxLevel && (
          <PriceContainer>
            <HexStyled $currency={currency as CurrencyType} />
            <span>{price >= 0 ? formatMoney(price) : '?'}</span>
          </PriceContainer>
        )}
        {isLocked && !maxLevel && <LockedContainer>Locked</LockedContainer>}
      </InfoContainer>
    </ButtonContainer>
  );
};

export default UpgradeButton;

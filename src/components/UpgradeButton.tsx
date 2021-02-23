import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { buyUpgradeAction } from '../state/actions';
import { currencySelector, incrementalsSelector } from '../state/selectors';
import { upgrades, UpgradeType } from '../helpers/values';
import BuyableItem from './BuyableItem';
import theme from '../helpers/theme';

const UpgradeButtonContainer = styled.div`
  margin-top: 8px;
  width: 100%;
  height: 60px;
  background-color: white;
  border-top: 4px solid ${theme.colors.upgradeButtons.border};
  border-bottom: 4px solid ${theme.colors.upgradeButtons.border};
  display: flex;
  color: black;
`;

interface UpgradeButtonProps {
  upgradeId: UpgradeType;
  selectedHex: string;
}

const UpgradeButton = ({ upgradeId, selectedHex }: UpgradeButtonProps) => {
  const currency = useSelector(currencySelector);
  const incrementals = useSelector(incrementalsSelector);

  const dispatch = useDispatch();

  const incrementalUpgrades = incrementals[selectedHex]?.upgrades;

  const upgradeValue = ~~incrementalUpgrades?.[upgradeId];

  const { price: priceArray, description1, description2 } = upgrades[upgradeId];
  const price = priceArray[upgradeValue];

  const onClick = () => {
    dispatch(buyUpgradeAction(selectedHex, upgradeId));
  };

  return (
    <UpgradeButtonContainer>
      <BuyableItem
        text={
          description1.length > 1 ? description1[upgradeValue] : description1[0]
        }
        secondaryText={
          description2.length > 1 ? description2[upgradeValue] : description2[0]
        }
        price={price}
        onClick={onClick}
        bought={false}
        disabled={currency.base < price}
        currency={'base'}
      />
    </UpgradeButtonContainer>
  );
};

export default UpgradeButton;

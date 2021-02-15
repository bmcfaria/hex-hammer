import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { buyUpgradeAction } from '../state/actions';
import { currencySelector, incrementalsSelector } from '../state/selectors';
import { upgrades, UpgradeTypes } from '../helpers/values';
import { GameObjectContext } from '../helpers/context';
import BuyableItem from './BuyableItem';

const UpgradeButtonContainer = styled.div`
  margin-top: 8px;
  width: 100%;
  height: 60px;
  background-color: white;
  border-top: 4px solid black;
  border-bottom: 4px solid black;
  display: flex;
  color: black;
`;

interface UpgradeButtonProps {
  upgradeId: UpgradeTypes;
}

const UpgradeButton = ({ upgradeId }: UpgradeButtonProps) => {
  const currency = useSelector(currencySelector);
  const incrementals = useSelector(incrementalsSelector);

  const dispatch = useDispatch();
  const { gameObject } = useContext(GameObjectContext);

  const incrementalUpgrades =
    incrementals[gameObject?.current?.selectedHex || '']?.upgrades;

  const upgradeValue = ~~incrementalUpgrades?.[upgradeId];

  const { price: priceArray, description1, description2 } = upgrades[upgradeId];
  const price = priceArray[upgradeValue];

  const onClick = () => {
    if (gameObject?.current?.selectedHex) {
      dispatch(buyUpgradeAction(gameObject.current.selectedHex, upgradeId));
    }
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

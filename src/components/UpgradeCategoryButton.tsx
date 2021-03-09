import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { incrementalsSelector, tradesSelector } from '../state/selectors';
import ExpandUpgradeButton from './ExpandUpgradeButton';
import SidebarIncrementalUpgrades from './SidebarIncrementalUpgrades';
import { ModalHexType, UpgradeCategoryType } from '../helpers/types';
import { incrementals } from '../helpers/incrementals';
import TradeButton from './TradeButton';

const Container = styled.div`
  width: 100%;
  height: auto;
`;

interface UpgradeCategoryButtonProps {
  upgradeCategoryId: UpgradeCategoryType;
}

const UpgradeCategoryButton = ({
  upgradeCategoryId,
}: UpgradeCategoryButtonProps) => {
  const incrementalsState = useSelector(incrementalsSelector);
  const trades = useSelector(tradesSelector);

  let text = '';
  switch (upgradeCategoryId) {
    case 'incrementals':
      text = 'Incrementals';
      break;
    case 'trade':
      text = 'Trade';
      break;
  }

  if (upgradeCategoryId === 'trade' && Object.keys(trades).length === 0) {
    return null;
  }

  return (
    <Container>
      <ExpandUpgradeButton id={upgradeCategoryId} text={text}>
        {upgradeCategoryId === 'incrementals' &&
          Object.keys(incrementalsState).map(incremental => (
            <ExpandUpgradeButton
              id={`${upgradeCategoryId}_${incremental}`}
              parentId={upgradeCategoryId}
              text={incrementals[incremental].name}
              key={incremental}
            >
              <SidebarIncrementalUpgrades selectedHex={incremental} showInfo />
            </ExpandUpgradeButton>
          ))}
        {upgradeCategoryId === 'trade' &&
          Object.keys(trades).map(modalKey => (
            <TradeButton modalKey={modalKey as ModalHexType} key={modalKey} />
          ))}
      </ExpandUpgradeButton>
    </Container>
  );
};

export default UpgradeCategoryButton;

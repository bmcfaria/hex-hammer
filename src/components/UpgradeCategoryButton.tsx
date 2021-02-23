import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { incrementalsSelector, tradesSelector } from '../state/selectors';
import { ModalHexType } from '../helpers/values';
import ExpandUpgradeButton from './ExpandUpgradeButton';
import SidebarIncrementalUpgrades from './SidebarIncrementalUpgrades';
import ModalTrade from './ModalTrade';
import { UpgradeCategoryType } from '../helpers/types';

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
  const incrementals = useSelector(incrementalsSelector);
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
      <ExpandUpgradeButton text={text}>
        {upgradeCategoryId === 'incrementals' &&
          Object.keys(incrementals).map(incremental => (
            <ExpandUpgradeButton text={incremental} key={incremental}>
              <SidebarIncrementalUpgrades selectedHex={incremental} />
            </ExpandUpgradeButton>
          ))}
        {upgradeCategoryId === 'trade' &&
          Object.keys(trades).map(tradeKey => (
            <ModalTrade modal={tradeKey as ModalHexType} key={tradeKey} />
          ))}
      </ExpandUpgradeButton>
    </Container>
  );
};

export default UpgradeCategoryButton;

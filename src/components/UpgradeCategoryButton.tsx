import { useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  incrementalsSelector,
  realitySelector,
  tradesSelector,
} from '../state/selectors';
import ExpandUpgradeButton from './ExpandUpgradeButton';
import SidebarIncrementalUpgrades from './SidebarIncrementalUpgrades';
import { ModalHexType, UpgradeCategoryType } from '../helpers/types';
import TradeButton from './TradeButton';
import { incrementalInfoReality } from '../helpers/utils';

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
  const reality = useSelector(realitySelector);

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

  const incrementalName = (incremental: string) => {
    const incrementalInfo = incrementalInfoReality(incremental, reality);

    return incrementalInfo?.name;
  };

  return (
    <Container>
      <ExpandUpgradeButton id={upgradeCategoryId} text={text}>
        {upgradeCategoryId === 'incrementals' &&
          Object.keys(incrementalsState).map(incremental => (
            <ExpandUpgradeButton
              id={`${upgradeCategoryId}_${incremental}`}
              parentId={upgradeCategoryId}
              text={incrementalName(incremental)}
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

import { useContext, useState } from 'react';
import styled from 'styled-components';
import SidebarButton from './SidebarButton';
import theme from '../helpers/theme';
import { GameObjectContext } from '../helpers/context';
import UpgradeCategoryButton from './UpgradeCategoryButton';
import SidebarIncrementalUpgrades from './SidebarIncrementalUpgrades';

const SIDEBAR_WIDTH = 300;

const Container = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 0px;
  right: 0;
  transition: right 0.5s;

  ${({ $open }) => ($open ? `right: ${SIDEBAR_WIDTH}px;` : '')}
`;

const SidebarContainer = styled.div`
  position: absolute;
  top: 60px;
  right: -${SIDEBAR_WIDTH + 4}px;
  width: ${SIDEBAR_WIDTH}px;
  height: auto;
  background-color: ${theme.colors.sidebar.background};
  border-left: 4px solid ${theme.colors.sidebar.border};
  border-bottom: 4px solid ${theme.colors.sidebar.border};
  padding-bottom: 8px;
`;

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { gameObject, scene } = useContext(GameObjectContext);

  if (scene === 'secondStage') {
  }

  const onClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <SidebarButton active={open} onClick={onClickOpen} />
      <Container $open={open}>
        <SidebarContainer>
          {scene === 'secondStage' && (
            <>
              <UpgradeCategoryButton upgradeCategoryId="incrementals" />
              <UpgradeCategoryButton upgradeCategoryId="trade" />
            </>
          )}

          {scene === 'incremental' && (
            <SidebarIncrementalUpgrades
              selectedHex={gameObject?.current?.selectedHex || ''}
            />
          )}
        </SidebarContainer>
      </Container>
    </>
  );
};

export default Sidebar;

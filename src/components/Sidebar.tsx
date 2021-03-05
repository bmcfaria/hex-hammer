import { useContext, useState } from 'react';
import styled from 'styled-components';
import SidebarButton from './SidebarButton';
import theme from '../helpers/theme';
import { GameObjectContext, SidebarContext } from '../helpers/context';
import UpgradeCategoryButton from './UpgradeCategoryButton';
import SidebarIncrementalUpgrades from './SidebarIncrementalUpgrades';

const SIDEBAR_WIDTH = 212;

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
  height: calc(100vh - 60px);
  background-color: ${theme.colors.sidebar.background};
  border-top: 4px solid ${theme.colors.sidebar.borderTop};
  border-left: 4px solid ${theme.colors.sidebar.borderLeft};
  padding-bottom: 8px;
  z-index: ${theme.zIndex.sidebar};

  &::after {
    content: '';
    position: absolute;
    left: -8px;
    top: -4px;
    width: 4px;
    height: 100%;
    background-color: ${theme.colors.sidebar.borderLeftOut};
  }
`;

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { gameObject, scene } = useContext(GameObjectContext);
  const [category, setCategory] = useState('');

  if (scene === 'secondStage') {
  }

  const onClickOpen = () => {
    setOpen(!open);
  };

  return (
    <SidebarContext.Provider value={{ category, setCategory }}>
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
    </SidebarContext.Provider>
  );
};

export default Sidebar;

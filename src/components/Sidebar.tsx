import { useState } from 'react';
import styled from 'styled-components';
import UpgradeButton from './UpgradeButton';
import SidebarButton from './SidebarButton';

const SIDEBAR_WIDTH = 300;

const Container = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 0px;
  right: -2px;
  transition: right 0.5s;

  ${({ $open }) => ($open ? `right: ${SIDEBAR_WIDTH}px;` : '')}
`;

const SidebarContainer = styled.div`
  position: absolute;
  top: 30px;
  left: 0;
  right: -${SIDEBAR_WIDTH}px;
  width: ${SIDEBAR_WIDTH - 4}px;
  height: auto;
  background-color: aqua;
  border-left: 4px solid black;
  border-bottom: 4px solid black;
  padding-top: 30px;
  padding-bottom: 100px;
`;

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const onClickOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <SidebarButton active={open} onClick={onClickOpen} />
      <Container $open={open}>
        <SidebarContainer>
          <UpgradeButton upgradeId="auto" />
          <UpgradeButton upgradeId="increment" />
        </SidebarContainer>
      </Container>
    </>
  );
};

export default Sidebar;

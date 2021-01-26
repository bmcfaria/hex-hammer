import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import UpgradeButton from './UpgradeButton';

const Container = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 0px;
  right: 0;
  transition: right 1s;

  ${({ $open }) => ($open ? 'right: 180px;' : '')}
`;

const MenuButton = styled.button`
  width: 74px;
  height: 60px;
  border: none;
  padding: 0;
  background: none;
  outline: none;

  & > svg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    color: white;
  }

  &:hover > svg {
    color: blue;
  }
`;

const SidebarContainer = styled.div`
  position: absolute;
  top: 30px;
  right: -180px;
  width: 180px;
  height: auto;
  background-color: aqua;
  padding-bottom: 8px;
`;

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const onClickOpen = () => {
    setOpen(!open);
  };

  return (
    <Container $open={open}>
      <MenuButton onClick={onClickOpen}>
        <Hex />
      </MenuButton>
      <SidebarContainer>
        <UpgradeButton upgradeId="auto" />
        <UpgradeButton upgradeId="increment1" />
      </SidebarContainer>
    </Container>
  );
};

export default Sidebar;

import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import UpgradeButton from './UpgradeButton';

const Container = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 0px;
  right: -2px;
  transition: right 1s;

  ${({ $open }) => ($open ? 'right: 180px;' : '')}
`;

const MenuButton = styled.button`
  position: absolute;
  top: 0;
  left: -50px;
  width: 50px;
  height: 60px;
  border: none;
  padding: 0;
  background: none;
  outline: none;
  z-index: 1;

  & > svg {
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
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
  left: 0;
  right: -180px;
  width: 177px;
  height: auto;
  background-color: aqua;
  padding-bottom: 8px;
  border-left: 3px solid black;
  border-bottom: 3px solid black;
  padding-bottom: 100px;
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
        <UpgradeButton upgradeId="increment" />
      </SidebarContainer>
    </Container>
  );
};

export default Sidebar;

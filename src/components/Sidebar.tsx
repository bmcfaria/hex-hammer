import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { buyAutoAction } from '../state/actions';
import { autoSelector, counterSelector } from '../state/selectors';

const Container = styled.div<{ $open: boolean }>`
  position: absolute;
  top: 0px;
  right: 0;
  transition: right 1s;

  ${({ $open }) => ($open ? 'right: 100px;' : '')}
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
  right: -100px;
  width: 100px;
  height: 100px;
  background-color: aqua;
`;

const BuyButtom = styled.button<{ $enoughCurrency: boolean; $bought: boolean }>`
  position: relative;
  border: none;
  padding: 0;
  background: none;
  outline: none;
  height: 50px;
  display: flex;
  margin-top: 8px;

  & > svg {
    height: 100%;
    color: ${({ $bought }) => ($bought ? 'green' : 'white')};
  }

  &:hover > svg {
    ${({ $enoughCurrency, $bought }) =>
      $bought ? '' : `color: ${$enoughCurrency ? 'yellow' : 'red'};`}
  }
`;

const AutoTex = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 60;
`;

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const counter = useSelector(counterSelector);
  const auto = useSelector(autoSelector);
  const dispatch = useDispatch();

  const onClickOpen = () => {
    setOpen(!open);
  };

  const buyAuto = () => {
    if (!auto) {
      dispatch(buyAutoAction);
    }
  };

  return (
    <Container $open={open}>
      <MenuButton onClick={onClickOpen}>
        <Hex />
      </MenuButton>
      <SidebarContainer>
        <BuyButtom
          $enoughCurrency={counter >= 10}
          $bought={auto}
          onClick={buyAuto}
        >
          <Hex />
          <AutoTex>
            Auto <br /> (10)
          </AutoTex>
        </BuyButtom>
      </SidebarContainer>
    </Container>
  );
};

export default Sidebar;

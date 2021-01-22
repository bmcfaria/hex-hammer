import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { counterSelector } from '../state/selectors';
import { ReactComponent as Hex } from '../assets/Hex.svg';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  background-color: black;
  color: white;
  display: flex;
`;

const MenuButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0;
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

  &:hover {
    & > svg {
      color: red;
    }
  }
`;

const CurrencyContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HexCurrency = styled(Hex)`
  width: 20px;
  height: auto;
  margin: 0 4px 0 8px;
`;

const StatusBar = () => {
  const counter = useSelector(counterSelector);

  return (
    <Container>
      <CurrencyContainer>
        <HexCurrency />
        {counter}
      </CurrencyContainer>
      <MenuButton>
        <Hex />
      </MenuButton>
    </Container>
  );
};

export default StatusBar;

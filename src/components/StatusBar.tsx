import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { counterSelector } from '../state/selectors';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
`;

const StatusBar = () => {
  const counter = useSelector(counterSelector);

  return <Container>{counter}</Container>;
};

export default StatusBar;

import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { incrementAction } from '../state/actions';

const Button = styled.button`
  position: relative;
  width: 124px;
  height: 100px;
  background: #d8d8d8;
  border: none;

  &:before,
  &:after {
    position: absolute;
    content: '';
    z-index: 1;
    top: 0;
    width: 0px;
    background: #fff;
    border-top: 50px transparent solid;
    border-bottom: 50px transparent solid;
  }

  &:before {
    left: 0;
    border-right: 30px #d8d8d8 solid;
  }
  &:after {
    right: 0;
    border-left: 30px #d8d8d8 solid;
  }
`;

interface HammerButtonProps {
  onClickBaam: Function;
}

const HammerButton = ({ onClickBaam }: HammerButtonProps) => {
  const dispatch = useDispatch();

  const onClick = () => {
    onClickBaam();
    dispatch(incrementAction);
  };

  return <Button onClick={onClick}>Baam!!!</Button>;
};

export default HammerButton;

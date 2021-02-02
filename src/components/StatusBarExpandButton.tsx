import { useContext } from 'react';
import styled from 'styled-components';
import { ReactComponent as Expand } from '../assets/Expand.svg';
import { GameObjectContext } from '../helpers/context';

const ExpandButton = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  width: 60px;
  height: 60px;
  border: 2px solid white;
  padding: 0;
  background: none;
  outline: none;
  z-index: 1;
  background-color: black;

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

const StatusBarExpandButton = () => {
  const { gameObject, scene } = useContext(GameObjectContext);

  const expand = () => {
    if (gameObject?.current) {
      gameObject.current?.changeScene('secondStage');
    }
  };

  if (scene !== 'incremental') {
    return null;
  }

  return (
    <ExpandButton onClick={expand}>
      <Expand />
    </ExpandButton>
  );
};

export default StatusBarExpandButton;

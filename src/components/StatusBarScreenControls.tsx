import styled from 'styled-components';
import { ReactComponent as HexRectangle } from '../assets/HexRectangle.svg';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { ReactComponent as Up } from '../assets/Up.svg';
import theme from '../helpers/theme';
import { useContext } from 'react';
import { GameObjectContext } from '../helpers/context';
import { incrementals } from '../helpers/incrementals';

const Container = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  height: 40px;
`;

const HexLabelContainer = styled.div`
  position: relative;
  width: auto;
  height: 100%;
  margin: 0 8px;
`;

const HexRectangleStyled = styled(HexRectangle)`
  width: auto;
  height: 100%;
  fill: ${theme.colors.statusBarScreenControls.background};
  stroke: ${theme.colors.statusBarScreenControls.border}; ;
`;

const HexLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
`;

const Button = styled.button`
  position: relative;
  width: auto;
  height: 100%;
  border: none;
  padding: 0;
  background: none;
  outline: none;
  margin: 0 8px;

  &:hover > [data-background] {
    color: ${theme.colors.statusBar.buttons.backgroundHover};
    stroke: ${theme.colors.statusBar.buttons.borderHover};
  }

  &:hover > [data-icon] {
    color: ${theme.colors.statusBar.buttons.iconHover};
  }
`;

const HexStyled = styled(Hex)`
  width: auto;
  height: 100%;
  color: ${theme.colors.statusBarScreenControls.background};
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoIcon = styled.div`
  font-size: 28px;
  font-weight: bold;
`;

const StatusBarScreenControls = () => {
  const { gameObject, scene } = useContext(GameObjectContext);

  if (scene !== 'incremental') {
    return null;
  }

  const up = () => {
    if (gameObject?.current) {
      gameObject.current?.changeScene('secondStage');
    }
  };

  let text =
    incrementals[gameObject?.current?.selectedHex || '']?.name ||
    `${gameObject?.current?.selectedHex}`;

  return (
    <Container>
      <Button onClick={up}>
        <HexStyled data-background />
        <IconContainer data-icon>
          <Up />
        </IconContainer>
      </Button>
      <HexLabelContainer>
        <HexRectangleStyled />
        <HexLabel>{text}</HexLabel>
      </HexLabelContainer>
      <Button
        onClick={() => {
          console.log('Info button');
        }}
      >
        <HexStyled data-background />
        <IconContainer data-icon>
          <InfoIcon>i</InfoIcon>
        </IconContainer>
      </Button>
    </Container>
  );
};

export default StatusBarScreenControls;

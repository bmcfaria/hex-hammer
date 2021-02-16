import styled from 'styled-components';
import { ReactComponent as HexRectangle } from '../assets/HexRectangle.svg';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { ReactComponent as Minus } from '../assets/Minus.svg';
import { ReactComponent as Plus } from '../assets/Plus.svg';
import { ReactComponent as Up } from '../assets/Up.svg';
import theme from '../helpers/theme';
import { useContext } from 'react';
import { GameObjectContext } from '../helpers/context';

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

const Button = styled.button<{ $hide?: boolean }>`
  position: relative;
  width: auto;
  height: 100%;
  border: none;
  padding: 0;
  background: none;
  outline: none;
  margin: 0 8px;
  /* To maintain spacing */
  ${({ $hide }) => ($hide ? 'visibility: hidden;' : '')}

  &:hover > [data-background] {
    color: ${theme.colors.statusBar.buttons.backgroundHover};
    stroke: ${theme.colors.statusBar.buttons.borderHover};
  }

  &:hover > [data-icon] > svg {
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

const StatusBarScreenControls = () => {
  const { gameObject, scene } = useContext(GameObjectContext);

  const up = () => {
    if (scene !== 'incremental') {
      return;
    }

    if (gameObject?.current) {
      gameObject.current?.changeScene('secondStage');
    }
  };

  const minus = () => {
    if (scene !== 'secondStage') {
      return;
    }

    gameObject?.current?.ui?.zoomOut?.();
  };

  const plus = () => {
    if (scene !== 'secondStage') {
      return;
    }

    gameObject?.current?.ui?.zoomIn?.();
  };

  let text = 'Zoom';
  if (scene === 'incremental') {
    text = `${gameObject?.current?.selectedHex}`;
  }

  return (
    <Container>
      {scene === 'incremental' && (
        <Button onClick={up}>
          <HexStyled data-background />
          <IconContainer data-icon>
            <Up />
          </IconContainer>
        </Button>
      )}
      {scene === 'secondStage' && (
        <Button onClick={minus}>
          <HexStyled data-background />
          <IconContainer data-icon>
            <Minus />
          </IconContainer>
        </Button>
      )}
      <HexLabelContainer>
        <HexRectangleStyled />
        <HexLabel>{text}</HexLabel>
      </HexLabelContainer>
      {/* Visibility prop to maintain spacing */}
      <Button data-background $hide={scene !== 'secondStage'} onClick={plus}>
        <HexStyled />
        <IconContainer data-icon>
          <Plus />
        </IconContainer>
      </Button>
    </Container>
  );
};

export default StatusBarScreenControls;

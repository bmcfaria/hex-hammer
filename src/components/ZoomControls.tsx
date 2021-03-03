import styled from 'styled-components';
import theme, { resetButtonStyles } from '../helpers/theme';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { ReactComponent as Minus } from '../assets/Minus.svg';
import { ReactComponent as Plus } from '../assets/Plus.svg';
import { useContext } from 'react';
import { GameObjectContext } from '../helpers/context';

const Container = styled.div`
  position: fixed;
  bottom: 16px;
  left: 16px;
`;

const Button = styled.button`
  ${resetButtonStyles}
  position: relative;
  width: auto;
  height: 40px;
  margin: 8px 0 0 0;
  display: block;

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

const ZoomControls = () => {
  const { gameObject, scene } = useContext(GameObjectContext);

  if (scene !== 'secondStage') {
    return null;
  }

  const minus = () => {
    gameObject?.current?.ui?.zoomOut?.();
  };

  const plus = () => {
    gameObject?.current?.ui?.zoomIn?.();
  };

  return (
    <Container>
      <Button onClick={plus}>
        <HexStyled data-background />
        <IconContainer data-icon>
          <Plus />
        </IconContainer>
      </Button>
      <Button onClick={minus}>
        <HexStyled data-background />
        <IconContainer data-icon>
          <Minus />
        </IconContainer>
      </Button>
    </Container>
  );
};

export default ZoomControls;

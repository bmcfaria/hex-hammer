import styled from 'styled-components';
import theme, { resetButtonStyles } from '../helpers/theme';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { ReactComponent as Minus } from '../assets/Minus.svg';
import { ReactComponent as Plus } from '../assets/Plus.svg';
import { useContext } from 'react';
import { GameObjectContext } from '../helpers/context';
import useUIControl from '../hooks/useUIControl';

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

  &:hover > [data-icon] > [data-circle] {
    background-color: ${theme.colors.statusBar.buttons.iconHover};
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

const Circle = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 8px;
  background-color: black;
`;

const ZoomControls = () => {
  const { scene } = useContext(GameObjectContext);
  const { center, minus, plus, isCentered, isMaxZoom } = useUIControl();

  if (scene !== 'secondStage') {
    return null;
  }

  return (
    <Container>
      {!isCentered && (
        <Button onClick={center}>
          <HexStyled data-background />
          <IconContainer data-icon>
            <Circle data-circle />
          </IconContainer>
        </Button>
      )}
      {!isMaxZoom && (
        <Button onClick={plus}>
          <HexStyled data-background />
          <IconContainer data-icon>
            <Plus />
          </IconContainer>
        </Button>
      )}
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

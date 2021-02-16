import styled from 'styled-components';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import theme from '../helpers/theme';

const Button = styled.button<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 0;
  ${({ $side }) => ($side === 'left' ? 'left: -20px' : '')};
  ${({ $side }) => ($side === 'right' ? 'right: -20px' : '')};
  width: 69px;
  height: 60px;
  border: none;
  padding: 0;
  background: none;
  outline: none;
  z-index: 1;

  &:hover > [data-background] {
    color: ${theme.colors.statusBar.buttons.backgroundHover};
    stroke: ${theme.colors.statusBar.buttons.borderHover};
  }

  &:hover > [data-icon] > svg {
    color: ${theme.colors.statusBar.buttons.iconHover};
  }
`;

const HexStyled = styled(Hex)<{ $active?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: auto;
  height: 100%;
  color: ${theme.colors.statusBar.buttons.background};
  stroke: ${theme.colors.statusBar.buttons.border};

  ${({ $active }) =>
    $active ? `color: ${theme.colors.statusBar.buttons.backgroundActive};` : ''}
  ${({ $active }) =>
    $active ? `stroke: ${theme.colors.statusBar.buttons.borderActive};` : ''}
`;

const IconContainer = styled.div<{ $active?: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > svg {
    color: ${theme.colors.statusBar.buttons.icon};
    ${({ $active }) =>
      $active ? `color: ${theme.colors.statusBar.buttons.iconActive};` : ''}
  }
`;

type StatusBarButtonProps = {
  side: 'left' | 'right';
  onClick?: any;
  active?: boolean;
  children?: React.ReactNode;
};

const StatusBarButton = ({
  children,
  side,
  active = false,
  onClick,
}: StatusBarButtonProps) => (
  <Button $side={side} onClick={onClick}>
    <HexStyled $active={active} data-background />
    <IconContainer $active={active} data-icon>
      {children}
    </IconContainer>
  </Button>
);

export default StatusBarButton;

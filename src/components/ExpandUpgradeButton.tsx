import { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as Chevron } from '../assets/Chevron.svg';
import theme, { resetButtonStyles } from '../helpers/theme';

const Container = styled.button<{ $active?: boolean }>`
  ${resetButtonStyles}
  margin-top: ${({ $active }) => ($active ? 0 : 8)}px;
  width: 100%;
  height: 60px;
  background-color: white;
  border-top: 4px solid ${theme.colors.upgradeButtons.border};
  border-bottom: 4px solid ${theme.colors.upgradeButtons.border};
  display: flex;
  align-items: center;
  color: black;
  transition: margin-top 0.5s;

  &:hover {
    border-top: 4px solid ${theme.colors.upgradeButtons.borderHover};
    border-bottom: 4px solid ${theme.colors.upgradeButtons.borderHover};
  }

  &:hover > [data-icon] {
    color: ${theme.colors.upgradeButtons.iconHover};
  }
`;

const TextContainer = styled.div`
  flex-grow: 1;
  font-family: 20px;
`;

const ChevronStyled = styled(Chevron)<{ $active?: boolean }>`
  transform: rotate(${({ $active }) => ($active ? 90 : -90)}deg);
  margin-right: 20px;
  color: ${theme.colors.upgradeButtons.icon};
  transition: transform 0.5s;
`;

const ExpandPanel = styled.div<{ $active?: boolean }>`
  width: 100%;
  height: 0;
  overflow: hidden;
  ${({ $active }) => ($active ? 'height: auto;' : '')}

  border-left: 4px solid ${theme.colors.upgradeButtons.border};
`;

interface ExpandUpgradeButtonProps {
  text: string;
  children?: React.ReactNode;
}

const ExpandUpgradeButton = ({ text, children }: ExpandUpgradeButtonProps) => {
  const [active, setActive] = useState(false);

  const onClick = () => {
    setActive(!active);
  };

  return (
    <>
      <Container $active={active} onClick={onClick}>
        <TextContainer>{text}</TextContainer>
        <ChevronStyled data-icon $active={active} />
      </Container>
      <ExpandPanel $active={active}>{children}</ExpandPanel>
    </>
  );
};

export default ExpandUpgradeButton;

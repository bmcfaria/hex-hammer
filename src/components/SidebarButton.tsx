import styled from 'styled-components';
import { ReactComponent as Chevron } from '../assets/Chevron.svg';
import StatusBarButton from './StatusBarButton';

const ChevronStyled = styled(Chevron)<{ $active: boolean }>`
  transition: transform 0.5s;
  ${({ $active }) => ($active ? 'transform: rotate(180deg);' : '')}
`;

type SidebarButtonProps = {
  active?: boolean;
  onClick: any;
};

const SidebarButton = ({ active, onClick }: SidebarButtonProps) => (
  <StatusBarButton side="right" active={active} onClick={onClick}>
    <ChevronStyled $active={!!active} />
  </StatusBarButton>
);

export default SidebarButton;

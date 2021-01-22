import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { counterSelector } from '../state/selectors';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import Sidebar from './Sidebar';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30px;
  background-color: black;
  color: white;
  display: flex;
`;

const CurrencyContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HexCurrency = styled(Hex)`
  width: 20px;
  height: auto;
  margin: 0 4px 0 8px;
`;

const StatusBar = () => {
  const counter = useSelector(counterSelector);

  return (
    <Container>
      <CurrencyContainer>
        <HexCurrency />
        {counter}
      </CurrencyContainer>
      <Sidebar />
    </Container>
  );
};

export default StatusBar;

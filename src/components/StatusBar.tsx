import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { currencySelector } from '../state/selectors';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import Sidebar from './Sidebar';
import StatusBarExpandButton from './StatusBarExpandButton';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: black;
  color: white;
  display: flex;
`;

const CurrencyContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 20px;
  line-height: 20px;
  margin: 0 auto;
`;

const HexCurrency = styled(Hex)`
  width: auto;
  height: 20px;
  margin: 0 4px 0 8px;
`;

const StatusBar = () => {
  const currency = useSelector(currencySelector);

  return (
    <Container>
      <StatusBarExpandButton />
      <CurrencyContainer>
        <HexCurrency />
        {currency.base}
      </CurrencyContainer>
      <Sidebar />
    </Container>
  );
};

export default StatusBar;

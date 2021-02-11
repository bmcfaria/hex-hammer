import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { currencySelector, incrementalsSelector } from '../state/selectors';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import Sidebar from './Sidebar';
import StatusBarExpandButton from './StatusBarExpandButton';
import { useContext, useEffect } from 'react';
import { GameObjectContext } from '../helpers/context';
import { incrementAction } from '../state/actions';
import { upgrades } from '../helpers/values';
import theme from '../helpers/theme';
import { CurrenciesTypes } from '../helpers/types';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: black;
  color: white;
  display: flex;
  z-index: ${theme.zIndex.statusBar};
`;

const CurrenciesContainer = styled.div`
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const CurrencyContainer = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  font-size: 20px;
  line-height: 20px;
`;

const HexCurrency = styled(Hex)<{ $currency: CurrenciesTypes }>`
  width: auto;
  height: 20px;
  margin: 0 4px 0 8px;
  ${({ $currency }) => `color: ${theme.currencyColors[$currency]};`}
`;

const CurrencyPerSecond = styled.span`
  margin-left: 4px;
`;

const StatusBar = () => {
  const dispatch = useDispatch();
  const currency = useSelector(currencySelector);
  const incrementals = useSelector(incrementalsSelector);
  const { gameObject, scene } = useContext(GameObjectContext);

  useEffect(() => {
    // transition to incremental
    if (scene === 'incremental') {
      const selectedHex = gameObject?.current?.selectedHex;
      const currentTotal = ~~incrementals[selectedHex || '']?.total;
      gameObject?.current?.updateIncrementalState(currentTotal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameObject, scene]);

  // Handle auto increment
  useEffect(() => {
    const countDown = setInterval(() => {
      Object.entries(incrementals).forEach(
        ([incrementalName, incrementalValue]) => {
          const { lastCounter } = incrementalValue as any;
          const autoValue = ~~(incrementalValue as any)?.upgrades?.auto;

          const tmpTimeLeft = new Date().getTime() - lastCounter;
          if (
            autoValue > 0 &&
            tmpTimeLeft >= upgrades.auto.value[autoValue - 1] * 1000
          ) {
            dispatch(incrementAction(incrementalName));
          }
        }
      );
    }, 100);

    return () => {
      clearInterval(countDown);
    };
  }, [dispatch, incrementals]);

  let totalValuePerSecond = 0;
  Object.entries(incrementals).forEach(([incrementalKey, incrementalValue]) => {
    const { increment, auto } = (incrementalValue as any)?.upgrades || {
      increment: 0,
      auto: 0,
    };

    if (auto) {
      const valuePerSecond =
        (1 + ~~upgrades.increment.value[increment - 1]) /
        upgrades.auto.value[auto - 1];

      totalValuePerSecond += valuePerSecond;

      if (~~valuePerSecond > 0) {
        gameObject?.current?.inc?.update(incrementalKey, valuePerSecond);
      }
    }
  });

  return (
    <Container>
      <StatusBarExpandButton />
      <CurrenciesContainer>
        {Object.keys(currency).map(currencyKey => (
          <CurrencyContainer key={currencyKey}>
            <HexCurrency $currency={currencyKey as CurrenciesTypes} />
            {currency[currencyKey]}
            {~~totalValuePerSecond > 0 && (
              <CurrencyPerSecond>({~~totalValuePerSecond}/s)</CurrencyPerSecond>
            )}
          </CurrencyContainer>
        ))}
      </CurrenciesContainer>
      <Sidebar />
    </Container>
  );
};

export default StatusBar;

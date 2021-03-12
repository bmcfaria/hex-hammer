import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CurrencyType, ModalHexType } from '../helpers/types';
import { modalsHex } from '../helpers/modals';
import { unlockUpgradeAction } from '../state/actions';
import { currencySelector, upgradesSelector } from '../state/selectors';
import ButtonHex from './ButtonHex';
import theme from '../helpers/theme';
import { upgrades } from '../helpers/values';
import stringsObject from '../helpers/strings.json';
import { ReactComponent as Checkmark } from '../assets/Checkmark.svg';

const Container = styled.div`
  width: 100%;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
`;

const Description = styled.div`
  width: 100%;
  height: 32px;
  text-align: center;
  font-size: 16px;
  line-height: 32px;
  border-top: 1px solid ${theme.colors.modal.border};
  border-bottom: 1px solid ${theme.colors.modal.border};
`;

const Content = styled.div`
  width: 100%;
  margin: 16px 0;

  & > div:nth-child(odd) {
    background: ${theme.colors.modal.infoOddBackground};
  }
`;

const Row = styled.div`
  width: 100%;
  height: 32px;
  line-height: 32px;
  display: flex;
  padding: 0 16px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
`;

const Locked = styled.div``;

const CheckmarkStyled = styled(Checkmark)`
  width: auto;
  height: 20px;
  color: ${theme.colors.modal.checkmark};
`;

interface ModalUpgradeProps {
  modal: ModalHexType;
}

const ModalUpgrade = ({ modal }: ModalUpgradeProps) => {
  const dispatch = useDispatch();
  const currencies = useSelector(currencySelector);
  const upgradesState = useSelector(upgradesSelector);

  const modalInfo = modalsHex[modal];
  if (!modalInfo || modalInfo.type !== 'upgrade') {
    return null;
  }

  const price = modalInfo.prices[0];
  const enoughtMoney = currencies[modalInfo.currency] >= price;
  const { lockIndex } = modalInfo;

  const { name, description2, levelLock } = upgrades[modalInfo.upgrade];

  const currentLevelLock = upgradesState[modalInfo.upgrade]?.levelLock || 0;

  const slicedRows = description2.slice(
    levelLock[lockIndex - 1],
    levelLock[lockIndex]
  );

  const buy = () => {
    if (enoughtMoney) {
      dispatch(unlockUpgradeAction(modal, modalInfo.upgrade));
    }
  };

  return (
    <Container>
      {/* <ModalInfo selectedHex={modal} /> */}
      <Description>{name}</Description>
      <Content>
        {slicedRows.map((value, index) => (
          <Row key={value}>
            <div>level {levelLock[lockIndex - 1] + index}</div>
            <div>{value}</div>
          </Row>
        ))}
      </Content>
      {currentLevelLock + 1 < lockIndex && (
        <Locked>{stringsObject.modal.upgrade.locked}</Locked>
      )}
      {currentLevelLock + 1 === lockIndex && (
        <ButtonHex
          onClick={buy}
          disabled={!enoughtMoney}
          currency={modalInfo.currency as CurrencyType}
          price={price}
        />
      )}
      {currentLevelLock + 1 > lockIndex && <CheckmarkStyled />}
    </Container>
  );
};

export default ModalUpgrade;

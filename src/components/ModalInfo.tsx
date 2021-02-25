import React from 'react';
import styled from 'styled-components';
import theme from '../helpers/theme';
import { CurrencyType } from '../helpers/types';
import stringsObject from '../helpers/strings.json';
import { incrementals } from '../helpers/incrementals';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { ReactComponent as Checkmark } from '../assets/Checkmark.svg';
import { useSelector } from 'react-redux';
import { incrementalsSelector } from '../state/selectors';
import { flipsUntilRing } from '../helpers/utils';

const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;

  & > div:nth-child(odd) {
    background: ${theme.colors.modal.infoOddBackground};
  }
`;

const Row = styled.div`
  width: 100%;
  height: 32px;
  text-align: left;
  font-size: 16px;
  line-height: 32px;
  display: flex;
  padding: 0 16px;
  box-sizing: border-box;
  align-items: center;

  & > div:first-child {
    flex-grow: 1;
  }
`;

const HexStyled = styled(Hex)<{ $currency: CurrencyType }>`
  width: auto;
  height: 22px;
  margin-right: -8px;
  ${({ $currency }) => `color: ${theme.currencyColors[$currency]};`}
`;

const CenterText = styled.div`
  text-align: center;
`;

const BoldText = styled.div`
  font-weight: bold;
`;

const CheckmarkStyled = styled(Checkmark)`
  margin-right: -4px;
`;

interface ModalInfoProps {
  selectedHex: string;
}

const ModalInfo = ({ selectedHex }: ModalInfoProps) => {
  const increment = useSelector(incrementalsSelector);
  const incrementalObject = incrementals[selectedHex];

  const isBonusActive = (bonus: any) => {
    switch (bonus.type) {
      case 'atRing':
        const currentTotal = increment[selectedHex].total;
        if (
          currentTotal >=
          flipsUntilRing(incrementalObject.flipsToExpand, bonus.value)
        ) {
          return true;
        }

        return false;
      default:
        return false;
    }
  };

  return (
    <Container>
      <Row>
        <div>{stringsObject.modal.info.name}:</div>
        <div>{selectedHex}</div>
      </Row>
      <Row>
        <div>{stringsObject.modal.info.type}:</div>
        <div>{stringsObject.modal.info.incremental}</div>
      </Row>
      <Row>
        <div>{stringsObject.modal.info.level}:</div>
        <div>1</div>
      </Row>
      <Row>
        <div>{stringsObject.modal.info['flips to expand']}:</div>
        <div>{incrementalObject.flipsToExpand}</div>
      </Row>
      <Row>
        <div>{stringsObject.modal.info['max rings']}:</div>
        <div>{incrementalObject.maxRings}</div>
      </Row>
      <Row>
        <div>{stringsObject.modal.info['main currency']}:</div>
        <HexStyled $currency={incrementalObject.mainCurrency} />
      </Row>
      <Row>
        <BoldText>{stringsObject.modal.info['break free']}:</BoldText>
        <BoldText>{incrementalObject.breakFree}</BoldText>
      </Row>
      {incrementalObject.bonus.length > 0 && (
        <>
          <Row>
            <CenterText>
              <BoldText>{stringsObject.modal.info.bonusTitle}</BoldText>
            </CenterText>
          </Row>
          {incrementalObject.bonus.map((bonus: any, index: number) => (
            <Row key={index}>
              <div>- {bonus.name}</div>
              {isBonusActive(bonus) && <CheckmarkStyled />}
            </Row>
          ))}
        </>
      )}
    </Container>
  );
};

export default ModalInfo;

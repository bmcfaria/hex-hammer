import React from 'react';
import styled from 'styled-components';
import theme from '../helpers/theme';
import { CurrencyType } from '../helpers/types';
import stringsObject from '../helpers/strings.json';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { ReactComponent as Checkmark } from '../assets/Checkmark.svg';
import { useSelector } from 'react-redux';
import { incrementalsSelector, realitySelector } from '../state/selectors';
import { flipsUntilRing, incrementalInfoReality } from '../helpers/utils';

const Container = styled.div`
  width: 100%;
  margin-bottom: 20px;

  & > div:nth-child(odd) {
    background: ${theme.colors.modal.infoOddBackground};
  }
`;

const BaseRow = styled.div`
  width: 100%;
  height: 32px;
  text-align: left;
  font-size: 16px;
  line-height: 32px;
  display: flex;
  padding: 0 16px;
  box-sizing: border-box;
  align-items: center;
`;

const Row = styled(BaseRow)`
  & > div:first-child {
    flex-grow: 1;
  }
`;

const BonusRowStyled = styled(BaseRow)`
  & > [data-hex-currency] {
    margin: 0 4px;
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
  margin-left: auto;
  margin-right: -4px;
  color: ${theme.colors.modal.checkmark};
`;

interface ModalInfoProps {
  selectedHex: string;
}

const BonusRow = ({ text, active }: { text: string; active: boolean }) => {
  const textSplit = text.split('#');

  const generateRow = (textFragment: string, index: number) => {
    if (index === 0) {
      return <div>- {textFragment}</div>;
    }

    const coin = textFragment.split(' ')[0] as CurrencyType;
    const restOfText = textFragment.substring(coin.length);
    return (
      <>
        <HexStyled data-hex-currency $currency={coin} />
        <div>{restOfText}</div>
      </>
    );
  };

  return (
    <BonusRowStyled>
      {textSplit.map((textFragment, index) => (
        <React.Fragment key={`${textFragment}_${index}`}>
          {generateRow(textFragment, index)}
        </React.Fragment>
      ))}
      {active && <CheckmarkStyled />}
    </BonusRowStyled>
  );
};

const ModalInfo = ({ selectedHex }: ModalInfoProps) => {
  const increment = useSelector(incrementalsSelector);
  const reality = useSelector(realitySelector);
  const incrementalInfo = incrementalInfoReality(selectedHex, reality);

  const isBonusActive = (bonus: any) => {
    switch (bonus.type) {
      case 'atRing':
        const currentTotal = increment[selectedHex]?.total;
        if (
          currentTotal >=
          flipsUntilRing(incrementalInfo.flipsToExpand, bonus.value)
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
        <div>{incrementalInfo.name}</div>
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
        <div>{incrementalInfo.flipsToExpand}</div>
      </Row>
      <Row>
        <div>{stringsObject.modal.info['max rings']}:</div>
        <div>{incrementalInfo.maxRings}</div>
      </Row>
      <Row>
        <div>{stringsObject.modal.info['main currency']}:</div>
        <HexStyled $currency={incrementalInfo.mainCurrency} />
      </Row>
      <Row>
        <BoldText>{stringsObject.modal.info['break free']}:</BoldText>
        <BoldText>{incrementalInfo.breakFree}</BoldText>
      </Row>
      {incrementalInfo.bonus.length > 0 && (
        <>
          <Row>
            <CenterText>
              <BoldText>{stringsObject.modal.info.bonusTitle}</BoldText>
            </CenterText>
          </Row>
          {incrementalInfo.bonus.map((bonus: any, index: number) => (
            <BonusRow
              text={bonus.name}
              active={isBonusActive(bonus)}
              key={index}
            />
          ))}
        </>
      )}
    </Container>
  );
};

export default ModalInfo;

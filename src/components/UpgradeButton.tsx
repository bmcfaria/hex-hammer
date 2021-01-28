import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { ReactComponent as HexRectangle } from '../assets/HexRectangle.svg';
import { buyUpgradeAction } from '../state/actions';
import { upgradeSelector, counterSelector } from '../state/selectors';
import { upgrades, UpgradeTypes } from '../helpers/values';

const UpgradeButtonContainer = styled.div`
  margin-top: 8px;
`;

const ButtonContainer = styled.button<{
  $enoughCurrency?: boolean;
}>`
  width: auto;
  height: 50px;
  border: none;
  padding: 0;
  background: none;
  outline: none;
  position: relative;
  vertical-align: top;

  & > [data-button-hex-background] {
    stroke: ${({ $enoughCurrency }) => ($enoughCurrency ? 'black' : 'red')};
  }

  &:hover {
    & > [data-button-hex-background] {
      stroke: ${({ $enoughCurrency }) => ($enoughCurrency ? 'green' : 'red')};
    }
    & > [data-button-hex-price-container] {
      stroke: ${({ $enoughCurrency }) => ($enoughCurrency ? 'green' : 'red')};
    }
  }
`;

const HexRectangleStyled = styled(HexRectangle)`
  width: auto;
  height: 100%;
  fill: white;
`;

const HexStyled = styled(Hex)`
  width: auto;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  fill: black;
`;

const DescriptionContainer = styled.div`
  position: absolute;
  top: 0;
  left: 6px;
  width: 94px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PriceLevelContainer = styled.div`
  width: 52px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: left;
  line-height: 16px;

  & > svg {
    width: auto;
    height: 12px;
    margin-right: 2px;
  }

  & > span {
    width: 100%;
  }
`;

const BoughtUpgradeContainer = styled.div`
  width: auto;
  height: 50px;
  color: white;
  position: relative;
  font-size: 14px;
  vertical-align: top;
  display: inline-block;

  & > svg {
    fill: black;
  }
`;

const BoughtUpgradeLevel = styled.div`
  width: 56px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 16px;
`;

interface BoughtUpgradeProps {
  upgradeId: UpgradeTypes;
  level: number;
}

const BoughtUpgrade = ({ upgradeId, level }: BoughtUpgradeProps) => {
  const { description1, description2 } = upgrades[upgradeId];

  return (
    <BoughtUpgradeContainer>
      <HexRectangleStyled />
      <DescriptionContainer data-button-description>
        {description1.length > 1 ? description1[level] : description1[0]}
        <br />
        {description2.length > 1 ? description2[level] : description2[0]}
      </DescriptionContainer>
      <BoughtUpgradeLevel>lvl {level + 1}</BoughtUpgradeLevel>
    </BoughtUpgradeContainer>
  );
};

interface UpgradeButtonProps {
  upgradeId: UpgradeTypes;
}

const UpgradeButton = ({ upgradeId }: UpgradeButtonProps) => {
  const currency = useSelector(counterSelector);
  const upgradeValue = useSelector(upgradeSelector(upgradeId));
  const dispatch = useDispatch();

  const { price: priceArray, description1, description2 } = upgrades[upgradeId];
  const price = priceArray[upgradeValue];

  const onClick = () => {
    dispatch(buyUpgradeAction(upgradeId));
  };

  return (
    <UpgradeButtonContainer>
      {upgradeValue > 0 && (
        <BoughtUpgrade upgradeId={upgradeId} level={upgradeValue - 1} />
      )}
      {price && (
        <ButtonContainer $enoughCurrency={currency >= price} onClick={onClick}>
          <HexRectangleStyled data-button-hex-background />
          <HexStyled data-button-hex-price-container />
          <DescriptionContainer data-button-description>
            {description1.length > 1
              ? description1[upgradeValue]
              : description1[0]}
            <br />
            {description2.length > 1
              ? description2[upgradeValue]
              : description2[0]}
          </DescriptionContainer>
          <PriceLevelContainer>
            <Hex />
            {price}
          </PriceLevelContainer>
        </ButtonContainer>
      )}
    </UpgradeButtonContainer>
  );
};

export default UpgradeButton;

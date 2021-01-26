import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { ReactComponent as HexRectangle } from '../assets/HexRectangle.svg';
import { buyUpgradeAction } from '../state/actions';
import { upgradeSelector, counterSelector } from '../state/selectors';
import { upgrades, UpgradeTypes } from '../helpers/values';

const ButtonContainer = styled.button<{
  $enoughCurrency?: boolean;
  $bought?: boolean;
}>`
  width: auto;
  height: 50px;
  border: none;
  padding: 0;
  background: none;
  outline: none;
  position: relative;
  vertical-align: top;
  margin-top: 8px;

  & > [data-button-hex-background] {
    ${({ $bought }) => ($bought ? 'fill: black;' : '')}
    stroke: ${({ $enoughCurrency, $bought }) =>
      $enoughCurrency || $bought ? 'black' : 'red'};
  }

  & > [data-button-description] {
    ${({ $bought }) => `color: ${$bought ? 'white' : 'black'};`}
  }

  &:hover ${({ $bought }) => ($bought ? 'disabled' : '')} {
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

const PriceContainer = styled.div`
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
`;

interface UpgradeButtonProps {
  upgradeId: UpgradeTypes;
}

const UpgradeButton = ({ upgradeId }: UpgradeButtonProps) => {
  const currency = useSelector(counterSelector);
  const bought = useSelector(upgradeSelector(upgradeId));
  const dispatch = useDispatch();

  const { price, description1, description2 } = upgrades[upgradeId];

  const onClick = () => {
    if (!bought) {
      dispatch(buyUpgradeAction(upgradeId));
    }
  };

  return (
    <ButtonContainer
      $enoughCurrency={currency >= price}
      $bought={bought}
      onClick={onClick}
    >
      <HexRectangleStyled data-button-hex-background />
      <HexStyled data-button-hex-price-container />
      <DescriptionContainer data-button-description>
        {description1}
        <br />
        {description2}
      </DescriptionContainer>
      <PriceContainer>
        <Hex />
        {price}
      </PriceContainer>
    </ButtonContainer>
  );
};

export default UpgradeButton;

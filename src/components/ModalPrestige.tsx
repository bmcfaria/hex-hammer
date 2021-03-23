import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { ModalHexType } from '../helpers/types';
import { modalsHex } from '../helpers/modals';
import { prestigeAction } from '../state/actions';
import { realitySelector } from '../state/selectors';
import theme, { resetButtonStyles } from '../helpers/theme';

import { ReactComponent as HexRectangle } from '../assets/HexRectangle.svg';
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
  padding: 0 16px;
  text-align: center;
  box-sizing: border-box;
`;

const ButtonContainer = styled.button`
  ${resetButtonStyles}
  width: auto;
  height: 40px;
  position: relative;
  vertical-align: top;

  & span {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    line-height: 40px;
    font-weight: bold;
  }

  &:hover [data-button-hex-background] {
    ${({ disabled }) =>
      disabled ? '' : `stroke: ${theme.colors.upgradeButtons.borderHover};`}
  }
`;

const HexRectangleStyled = styled(HexRectangle)`
  width: auto;
  height: 100%;
  fill: white;
`;

const CheckmarkStyled = styled(Checkmark)`
  width: auto;
  height: 20px;
  color: ${theme.colors.modal.checkmark};
`;

interface ModalUpgradeProps {
  modal: ModalHexType;
}

const ModalPrestige = ({ modal }: ModalUpgradeProps) => {
  const dispatch = useDispatch();
  const currentReality = useSelector(realitySelector);

  const modalInfo = modalsHex[modal];
  if (!modalInfo || modalInfo.type !== 'prestige') {
    return null;
  }

  const { title, name, description, actions, minReality } = modalInfo;

  const alreadyPrestiged = currentReality > minReality;

  const prestige = () => {
    if (!alreadyPrestiged) {
      dispatch(prestigeAction(name));
    }
  };

  return (
    <Container>
      <Description>{description}</Description>
      <Content>
        {actions.map((value, index) => (
          <Row key={value}>
            <div>{value}</div>
          </Row>
        ))}
      </Content>
      {!alreadyPrestiged && (
        <ButtonContainer onClick={prestige}>
          <HexRectangleStyled data-button-hex-background />
          <span>{title}</span>
        </ButtonContainer>
      )}
      {alreadyPrestiged && <CheckmarkStyled />}
    </Container>
  );
};

export default ModalPrestige;

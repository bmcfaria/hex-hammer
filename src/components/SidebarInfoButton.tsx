import styled from 'styled-components';
import { ReactComponent as HexRectangle } from '../assets/HexRectangle.svg';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import theme, { resetButtonStyles } from '../helpers/theme';
import BaseModal from './BaseModal';
import ModalInfo from './ModalInfo';
import { useState } from 'react';
import stringsObject from '../helpers/strings.json';

const ButtonContainer = styled.button`
  ${resetButtonStyles}
  width: 208px;
  height: 68px;
  background-color: ${theme.colors.upgradeButtons.containerBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 8px;
  position: relative;

  &:hover [data-button-hex-background] {
    stroke: ${theme.colors.upgradeButtons.borderHover};
  }

  &:hover [data-icon] {
    stroke: ${theme.colors.upgradeButtons.borderHover};
  }

  &:hover [data-icon-text] {
    color: ${theme.colors.upgradeButtons.borderHover};
  }
`;

const HexRectangleStyled = styled(HexRectangle)`
  position: absolute;
  width: auto;
  height: 60px;
  fill: white;
`;

const InfoContainer = styled.div`
  width: auto;
  height: 24px;
  color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
  z-index: 1;
`;

const IconContainer = styled.div`
  position: relative;
  width: auto;
  height: 100%;
  margin-right: 4px;

  & > span {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    line-height: 24px;
    font-weight: bold;
  }
`;

const HexStyled = styled(Hex)`
  width: auto;
  height: 100%;
  color: ${theme.colors.statusBarScreenControls.background};
`;

const Description = styled.div`
  font-size: 20px;
  line-height: 24px;
`;

const InfoModalContainer = styled.div`
  color: black;
`;

const Name = styled.div`
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 20px;
  line-height: 40px;
`;

interface SidebarInfoButtonProps {
  selectedHex: string;
}

const SidebarInfoButton = ({ selectedHex }: SidebarInfoButtonProps) => {
  const [infoOpen, setInfoOpen] = useState(false);

  const openInfo = () => {
    setInfoOpen(true);
  };

  const closeInfo = () => {
    setInfoOpen(false);
  };

  return (
    <>
      <ButtonContainer onClick={openInfo}>
        <HexRectangleStyled data-button-hex-background />
        <InfoContainer>
          <IconContainer>
            <HexStyled data-icon />
            <span data-icon-text>i</span>
          </IconContainer>
          <Description>{stringsObject.info}</Description>
        </InfoContainer>
      </ButtonContainer>

      <BaseModal open={infoOpen} close={closeInfo}>
        <InfoModalContainer>
          <Name>{stringsObject.infoTitle}</Name>
          <ModalInfo selectedHex={selectedHex} />
        </InfoModalContainer>
      </BaseModal>
    </>
  );
};

export default SidebarInfoButton;

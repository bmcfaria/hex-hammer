import styled from 'styled-components';
import { ReactComponent as HexRectangle } from '../assets/HexRectangle.svg';
import { ReactComponent as Hex } from '../assets/Hex.svg';
import { ReactComponent as Up } from '../assets/Up.svg';
import theme, { resetButtonStyles } from '../helpers/theme';
import { useContext, useState } from 'react';
import { GameObjectContext } from '../helpers/context';
import { incrementals } from '../helpers/incrementals';
import BaseModal from './BaseModal';
import ModalInfo from './ModalInfo';
import useUIVisibility from '../hooks/useUIVisibility';

const Container = styled.div`
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translate(-50%, 0);
  display: flex;
  height: 40px;
`;

const HexLabelContainer = styled.div`
  position: relative;
  width: auto;
  height: 100%;
  margin: 0 8px;
`;

const HexRectangleStyled = styled(HexRectangle)`
  width: auto;
  height: 100%;
  fill: ${theme.colors.statusBarScreenControls.background};
  stroke: ${theme.colors.statusBarScreenControls.border}; ;
`;

const HexLabel = styled.label`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 14px;
`;

const Button = styled.button`
  ${resetButtonStyles}
  position: relative;
  width: auto;
  height: 100%;
  margin: 0 8px;

  &:hover > [data-background] {
    color: ${theme.colors.statusBar.buttons.backgroundHover};
    stroke: ${theme.colors.statusBar.buttons.borderHover};
  }

  &:hover > [data-icon] {
    color: ${theme.colors.statusBar.buttons.iconHover};
  }
`;

const HexStyled = styled(Hex)`
  width: auto;
  height: 100%;
  color: ${theme.colors.statusBarScreenControls.background};
`;

const IconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoIcon = styled.div`
  font-size: 28px;
  font-weight: bold;
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

const StatusBarScreenControls = () => {
  const [infoOpen, setInfoOpen] = useState(false);
  const { gameObject, scene } = useContext(GameObjectContext);
  const visibility = useUIVisibility()?.statusBar?.controls;

  if (scene !== 'incremental') {
    return null;
  }

  const up = () => {
    if (gameObject?.current) {
      gameObject.current?.changeScene('secondStage');
    }
  };

  const openInfo = () => {
    setInfoOpen(true);
  };

  const closeInfo = () => {
    setInfoOpen(false);
  };

  const text =
    incrementals[gameObject?.current?.selectedHex || '']?.name ||
    `${gameObject?.current?.selectedHex}`;

  return (
    <>
      <Container>
        {visibility.up && (
          <Button onClick={up}>
            <HexStyled data-background />
            <IconContainer data-icon>
              <Up />
            </IconContainer>
          </Button>
        )}
        {visibility.name && (
          <HexLabelContainer>
            <HexRectangleStyled />
            <HexLabel>{text}</HexLabel>
          </HexLabelContainer>
        )}
        {visibility.info && (
          <Button onClick={openInfo}>
            <HexStyled data-background />
            <IconContainer data-icon>
              <InfoIcon>i</InfoIcon>
            </IconContainer>
          </Button>
        )}
      </Container>
      <BaseModal open={infoOpen} close={closeInfo}>
        <InfoModalContainer>
          <Name>Info</Name>
          <ModalInfo selectedHex={gameObject?.current?.selectedHex || ''} />
        </InfoModalContainer>
      </BaseModal>
    </>
  );
};

export default StatusBarScreenControls;

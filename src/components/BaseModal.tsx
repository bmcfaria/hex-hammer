import React from 'react';
import { MouseEvent } from 'react';
import styled from 'styled-components';
import theme from '../helpers/theme';

const BackgroundShadow = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #0000007d;
`;

const Container = styled.div`
  width: 300px;
  min-height: 10px;
  height: auto;
  background-color: ${theme.colors.modal.background};
  border: 4px solid ${theme.colors.modal.border};
  margin: auto;
`;

interface BaseModalProps {
  children?: React.ReactNode;
  open: boolean;
  close: () => void;
}

const BaseModal = ({ open, close, children }: BaseModalProps) => {
  if (!open) {
    return null;
  }

  return (
    <BackgroundShadow onClick={close}>
      <Container onClick={(e: MouseEvent) => e.stopPropagation()}>
        {children}
      </Container>
    </BackgroundShadow>
  );
};

export default BaseModal;

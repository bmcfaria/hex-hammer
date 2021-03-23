import styled from 'styled-components';
import { modalsHex } from '../helpers/modals';
import BaseModal from './BaseModal';
import ModalExpand from './ModalExpand';
import ModalTrade from './ModalTrade';
import ModalUnlock from './ModalUnlock';
import useModal from '../hooks/useModal';
import ModalUpgrade from './ModalUpgrade';
import ModalPrestige from './ModalPrestige';

const Name = styled.div`
  width: 100%;
  height: 40px;
  text-align: center;
  font-size: 20px;
  line-height: 40px;
`;

const Modal = () => {
  const { modal, closeModal } = useModal();

  if (!modal) {
    return null;
  }

  const modalInfo = modalsHex[modal];

  return (
    <BaseModal open={!!modal} close={closeModal}>
      <Name>{modalInfo.title}</Name>
      {modalInfo.type === 'expand' && <ModalExpand modal={modal} />}
      {modalInfo.type === 'trade' && <ModalTrade modal={modal} />}
      {modalInfo.type === 'unlock' && <ModalUnlock modal={modal} />}
      {modalInfo.type === 'upgrade' && <ModalUpgrade modal={modal} />}
      {modalInfo.type === 'prestige' && <ModalPrestige modal={modal} />}
    </BaseModal>
  );
};

export default Modal;

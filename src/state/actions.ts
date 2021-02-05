import { ModalHexTypes, UpgradeTypes } from '../helpers/values';

export const INCREMENT_TYPE = 'INCREMENT';
export const incrementAction = (selectedHex: string) => ({
  type: INCREMENT_TYPE,
  selectedHex,
});

export const BUY_UPGRADE_TYPE = 'BUY_UPGRADE';
export const buyUpgradeAction = (
  selectedHex: string,
  upgradeId: UpgradeTypes
) => ({
  type: BUY_UPGRADE_TYPE,
  upgradeId,
  selectedHex,
});

export const BUY_MODAL_HEX_TYPE = 'BUY_MODAL_HEX';
export const buyModalHexAction = (modalId: ModalHexTypes) => ({
  type: BUY_MODAL_HEX_TYPE,
  modalId,
});

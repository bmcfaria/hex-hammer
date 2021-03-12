import { UpgradeKeyType } from '../helpers/values';
import { CurrencyType, ModalHexType } from '../helpers/types';

export const RESET_TYPE = 'RESET';
export const resetAction = {
  type: RESET_TYPE,
};

export const TOGGLE_DEV_TYPE = 'TOGGLE_DEV';
export const toggleDevAction = {
  type: TOGGLE_DEV_TYPE,
};

export const INCREMENT_TYPE = 'INCREMENT';
export const incrementAction = (selectedHex: string) => ({
  type: INCREMENT_TYPE,
  selectedHex,
});

export const BUY_UPGRADE_TYPE = 'BUY_UPGRADE';
export const buyUpgradeAction = (
  selectedHex: ModalHexType,
  upgradeId: UpgradeKeyType
) => ({
  type: BUY_UPGRADE_TYPE,
  upgradeId,
  selectedHex,
});

export const UNLOCK_UPGRADE_TYPE = 'UNLOCK_UPGRADE';
export const unlockUpgradeAction = (
  modalId: ModalHexType,
  upgradeId: UpgradeKeyType
) => ({
  type: UNLOCK_UPGRADE_TYPE,
  modalId,
  upgradeId,
});

export const BUY_MODAL_EXPAND_TYPE = 'BUY_EXPAND_HEX';
export const buyModalExpandAction = ({
  modalId,
  priceIndex,
  currency,
  convertTo,
}: {
  modalId: ModalHexType;
  priceIndex: number;
  currency?: CurrencyType;
  convertTo?: string;
}) => ({
  type: BUY_MODAL_EXPAND_TYPE,
  modalId,
  priceIndex,
  currency,
  convertTo,
});

export const BUY_MODAL_TRADE_TYPE = 'BUY_MODAL_TRADE';
export const butModalTradeAction = ({
  modalId,
  multiplier,
  invert,
}: {
  modalId: ModalHexType;
  multiplier: number;
  invert?: boolean;
}) => ({
  type: BUY_MODAL_TRADE_TYPE,
  modalId,
  multiplier,
  invert,
});

export const BUY_MODAL_UNLOCK_TYPE = 'BUY_MODAL_UNLOCK';
export const butModalUnlockAction = ({
  modalId,
}: {
  modalId: ModalHexType;
}) => ({
  type: BUY_MODAL_UNLOCK_TYPE,
  modalId,
});

export const BUY_MODAL_UPGRADE_TYPE = 'BUY_MODAL_UPGRADE';
export const butModalUpgradeAction = ({
  modalId,
}: {
  modalId: ModalHexType;
}) => ({
  type: BUY_MODAL_UPGRADE_TYPE,
  modalId,
});

export const DELETE_NOTIFICATION_TYPE = 'DELETE_NOTIFICATION';
export const deleteNotificationAction = (notificationId: string) => ({
  type: DELETE_NOTIFICATION_TYPE,
  notificationId,
});

export const DISABLE_TUTORIAL_TYPE = 'DISABLE_TUTORIAL';
export const disableTutorialAction = (tutorialKey: string) => ({
  type: DISABLE_TUTORIAL_TYPE,
  tutorialKey,
});

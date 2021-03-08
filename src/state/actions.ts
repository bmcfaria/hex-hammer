import { UpgradeType } from '../helpers/values';
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
  selectedHex: string,
  upgradeId: UpgradeType
) => ({
  type: BUY_UPGRADE_TYPE,
  upgradeId,
  selectedHex,
});

export const BUY_MODAL_HEX_TYPE = 'BUY_MODAL_HEX';
export const buyModalHexAction = ({
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
  type: BUY_MODAL_HEX_TYPE,
  modalId,
  priceIndex,
  currency,
  convertTo,
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

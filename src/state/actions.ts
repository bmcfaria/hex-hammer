import { UpgradeTypes } from '../helpers/values';

export const INCREMENT_TYPE = 'INCREMENT';
export const incrementAction = {
  type: INCREMENT_TYPE,
};

export const BUY_UPGRADE_TYPE = 'BUY_UPGRADE';
export const buyUpgradeAction = (upgradeId: UpgradeTypes) => ({
  type: BUY_UPGRADE_TYPE,
  upgradeId,
});

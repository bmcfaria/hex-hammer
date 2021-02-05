import { UpgradeTypes } from '../helpers/values';

export const currencySelector = (state: any) => state.currency;

export const incrementalsSelector = (state: any) => state.incrementals;

export const upgradeSelector = (upgradeId: UpgradeTypes) => (state: any) =>
  state.upgrades[upgradeId];

export const modalHexSelector = (state: any) => state.modalHex;

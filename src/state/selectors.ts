import { UpgradeTypes } from '../helpers/values';

export const counterSelector = (state: any) => state.counter;
export const lastCounterSelector = (state: any) => state.lastCounter;

export const upgradeSelector = (upgradeId: UpgradeTypes) => (state: any) =>
  state.upgrades[upgradeId];

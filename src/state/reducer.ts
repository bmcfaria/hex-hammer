import { upgrades, UpgradeTypes } from '../helpers/values';
import { BUY_UPGRADE_TYPE, INCREMENT_TYPE } from './actions';

export const initialState = {
  counter: 0,
  lastCounter: 0,
  upgrades: {
    auto: 0,
    increment: 0,
  },
};

export const reducer = (state = initialState, payload: any) => {
  switch (payload.type) {
    case INCREMENT_TYPE: {
      const currentTime = new Date().getTime();

      if (currentTime - state.lastCounter < 500) {
        return state;
      }

      const upgradeValue = state.upgrades.increment;

      let incrementValue = 1;
      if (upgradeValue > 0) {
        incrementValue += upgrades.increment.value[upgradeValue - 1];
      }

      return {
        ...state,
        counter: state.counter + incrementValue,
        lastCounter: currentTime,
      };
    }

    case BUY_UPGRADE_TYPE: {
      const { upgradeId }: { upgradeId: UpgradeTypes } = payload;
      const { price: priceArray } = upgrades[upgradeId];

      const price = priceArray[state.upgrades[upgradeId]];

      if (!price || state.counter < price) {
        return state;
      }

      return {
        ...state,
        counter: state.counter - price,
        upgrades: {
          ...state.upgrades,
          [upgradeId]: state.upgrades[upgradeId] + 1,
        },
      };
    }

    default: {
      return state;
    }
  }
};

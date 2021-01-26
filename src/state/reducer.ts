import { upgrades, UpgradeTypes } from '../helpers/values';
import { BUY_UPGRADE_TYPE, INCREMENT_TYPE } from './actions';

export const initialState = {
  counter: 0,
  lastCounter: 0,
  upgrades: {},
};

export const reducer = (state = initialState, payload: any) => {
  switch (payload.type) {
    case INCREMENT_TYPE: {
      const currentTime = new Date().getTime();

      if (currentTime - state.lastCounter < 500) {
        return state;
      }

      return {
        ...state,
        counter: state.counter + 1,
        lastCounter: currentTime,
      };
    }

    case BUY_UPGRADE_TYPE: {
      const { upgradeId }: { upgradeId: UpgradeTypes } = payload;
      const { price } = upgrades[upgradeId];
      if (state.counter < price) {
        return state;
      }

      return {
        ...state,
        counter: state.counter - price,
        upgrades: {
          ...state.upgrades,
          [upgradeId]: true,
        },
      };
    }

    default: {
      return state;
    }
  }
};

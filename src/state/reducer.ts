import { CurrencyType } from '../helpers/types';
import {
  modalHex,
  ModalHexType,
  upgrades,
  UpgradeType,
} from '../helpers/values';
import {
  BUY_MODAL_HEX_TYPE,
  BUY_UPGRADE_TYPE,
  INCREMENT_TYPE,
  RESET_TYPE,
} from './actions';

interface IncrementalType {
  unlocked: boolean;
  total: number;
  lastCounter: number;
  currency: CurrencyType;
  upgrades: { [key in UpgradeType]: number };
}

const incrementals: { [index: string]: IncrementalType } = {
  hex_0_0: {
    unlocked: true,
    total: 0,
    lastCounter: 0,
    currency: 'base',
    upgrades: {
      auto: 0,
      increment: 0,
      interval: 0,
    },
  },
};
const modalHexUpgrade: { [index: string]: any } = {};
const trades: { [index: string]: any } = {};
export const initialState = {
  currency: {
    base: undefined as number | undefined, //Dev
    red: undefined as number | undefined,
    blue: 10 as number | undefined,
    dark: undefined as number | undefined,
  },
  incrementals,
  modalHex: {
    ...[...Array(6)].reduce(
      (results, _, index) => ({ ...results, [`hex_${1}_${index}`]: true }),
      {}
    ),
    hex_2_0: true,
    // hex_2_2: true,
    hex_2_4: true,
    // hex_2_6: true,
    hex_2_8: true,
    // hex_2_10: true,
  },
  modalHexUpgrade,
  trades,
};

export const reducer = (state = initialState, payload: any) => {
  switch (payload.type) {
    case RESET_TYPE: {
      return {
        ...initialState,
      };
    }

    case INCREMENT_TYPE: {
      const currentTime = new Date().getTime();

      const { selectedHex } = payload;

      const currentSelectedHex = state.incrementals[selectedHex] || {
        upgrades: {},
      };

      const interval =
        (upgrades.interval.value[~~currentSelectedHex.upgrades?.interval] ||
          1) * 1000;

      if (
        currentTime - currentSelectedHex.lastCounter < interval ||
        !selectedHex
      ) {
        return state;
      }

      const upgradeValue = ~~currentSelectedHex.upgrades?.increment;

      let incrementValue = 1;
      if (upgradeValue > 0) {
        incrementValue += ~~upgrades.increment.value[upgradeValue - 1];
      }

      return {
        ...state,
        currency: {
          ...state.currency,
          base: (state.currency?.base || 0) + incrementValue,
        },
        incrementals: {
          ...state.incrementals,
          [selectedHex]: {
            ...currentSelectedHex,
            total: ~~currentSelectedHex.total + 1,
            lastCounter: currentTime,
          },
        },
      };
    }

    case BUY_UPGRADE_TYPE: {
      const {
        upgradeId,
        selectedHex,
        currency,
      }: {
        upgradeId: UpgradeType;
        selectedHex: string;
        currency?: CurrencyType;
      } = payload;

      const selectedCurrency = currency || 'base';

      const { price: priceArray } = upgrades[upgradeId];

      const currentSelectedHex = state.incrementals[selectedHex] || {
        upgrades: {},
      };
      const price = priceArray[~~currentSelectedHex.upgrades?.[upgradeId]];

      if (
        !price ||
        (state.currency[selectedCurrency] || 0) < price ||
        !selectedHex
      ) {
        return state;
      }

      return {
        ...state,
        currency: {
          ...state.currency,
          [selectedCurrency]: (state.currency[selectedCurrency] || 0) - price,
        },
        incrementals: {
          ...state.incrementals,
          [selectedHex]: {
            ...currentSelectedHex,
            upgrades: {
              ...(currentSelectedHex.upgrades || {}),
              [upgradeId]: ~~currentSelectedHex.upgrades?.[upgradeId] + 1,
            },
          },
        },
      };
    }

    case BUY_MODAL_HEX_TYPE: {
      const {
        modalId,
        priceIndex,
        currency,
        convertTo,
      }: {
        modalId: ModalHexType;
        priceIndex: number;
        currency?: CurrencyType;
        convertTo?: string;
      } = payload;
      const {
        prices,
        type,
        multiplier,
      }: { prices: number[]; type: string; multiplier?: number[] } = modalHex[
        modalId
      ];

      const selectedCurrency = currency || 'base';

      let price = prices[~~state.modalHexUpgrade[modalId]];

      if (
        !price ||
        (state.currency[selectedCurrency] || 0) < price ||
        state.modalHexUpgrade[modalId] >= 2 ||
        (type !== 'expand' && type !== 'trade' && type !== 'unlock')
      ) {
        return state;
      }

      let currencies = {};

      let newValues = {};
      if (type === 'expand') {
        // Activate more hexes
        const values = modalId.split('_');
        const currentRing = ~~values[1];
        const currentIndex = ~~values[2];

        const ringRange = [3, 5][~~state.modalHexUpgrade[modalId]];

        const baseRing = currentRing - ~~(ringRange / 2);

        const indexWidth = {
          3: [1, 3, 3],
          5: [1, 3, 5, 5, 5],
        }[ringRange as 3 | 5];

        newValues = [...Array(ringRange)].reduce((results, _, ringDiff) => {
          const tmpRing = baseRing + ringDiff;
          const tmpIndex = ~~(
            (currentIndex * ((baseRing + ringDiff) * 6)) /
            (currentRing * 6)
          );

          const indexResults = [...Array(indexWidth[ringDiff])].reduce(
            (tmpIndexResults, _, indexDiff) => {
              const diff = tmpIndex - ~~(indexWidth[ringDiff] / 2) + indexDiff;
              return {
                ...tmpIndexResults,
                [`hex_${tmpRing}_${
                  diff < 0 ? tmpRing * 6 + diff : diff
                }`]: true,
              };
            },
            {}
          );

          return {
            ...results,
            ...indexResults,
          };
        }, {});
      } else if (type === 'trade' && convertTo) {
        price = prices[priceIndex];
        if (!price || (state.currency[selectedCurrency] || 0) < price) {
          return state;
        }

        const multiplierValue = multiplier?.[priceIndex] || 1;
        currencies = {
          [convertTo]: ~~(state.currency as any)[convertTo] + multiplierValue,
        };
      }

      return {
        ...state,
        currency: {
          ...state.currency,
          [selectedCurrency]: (state.currency[selectedCurrency] || 0) - price,
          ...currencies,
        },
        modalHex: {
          ...state.modalHex,
          ...newValues,
        },
        modalHexUpgrade: {
          ...state.modalHexUpgrade,
          [modalId]:
            ~~state.modalHexUpgrade[modalId] +
            ~~(Object.keys(newValues).length > 0),
        },
        ...(type === 'trade' && {
          trades: {
            ...state.trades,
            [modalId]: true,
          },
        }),
        ...(type === 'unlock' && {
          incrementals: {
            ...state.incrementals,
            [modalId]: {
              ...(state.incrementals[modalId] || {}),
              unlocked: true,
            },
          },
        }),
      };
    }

    default: {
      return state;
    }
  }
};

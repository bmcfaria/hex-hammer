import { incrementals } from '../helpers/incrementals';
import { BonusType, CurrencyType, NotificationType } from '../helpers/types';
import {
  flipsUntilRing,
  generateNotificationIncrementalBonusId,
} from '../helpers/utils';
import {
  modalHex,
  ModalHexType,
  upgrades,
  UpgradeType,
} from '../helpers/values';
import {
  BUY_MODAL_HEX_TYPE,
  BUY_UPGRADE_TYPE,
  DELETE_NOTIFICATION_TYPE,
  INCREMENT_TYPE,
  RESET_TYPE,
} from './actions';

interface IncrementalType {
  unlocked: boolean;
  total: number;
  lastCounter: number;
  currency: CurrencyType;
  upgrades: { [key in UpgradeType]: number };
  unlockedBonus: { [index: number]: boolean };
}

const incrementalsState: { [index: string]: IncrementalType } = {
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
    unlockedBonus: {},
  },
};

const notificationsState: NotificationType[] = [];

const modalHexUpgrade: { [index: string]: any } = {};
const trades: { [index: string]: any } = {};
export const initialState = {
  currency: {
    base: 100 as number | undefined, //Dev
    red: undefined as number | undefined,
    blue: 10 as number | undefined,
    dark: undefined as number | undefined,
  },
  incrementals: incrementalsState,
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
  notifications: notificationsState,
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

      let bonusEarned = {
        unlockedBonus: {},
        currencies: {},
        notifications: [],
      };
      if (incrementals[selectedHex]?.bonus) {
        bonusEarned = incrementals[selectedHex].bonus.reduce(
          (results: any, bonus: BonusType, index: number) => {
            if (currentSelectedHex.unlockedBonus?.[index]) {
              return results;
            }

            // only handles atRing type at the moment
            if (bonus.type === 'atRing') {
              const isAtRing =
                (currentSelectedHex.total || 0) + 1 >=
                flipsUntilRing(
                  incrementals[selectedHex].flipsToExpand,
                  bonus.value
                );

              if (isAtRing) {
                // only handles currency type at the moment
                return {
                  ...results,
                  unlockedBonus: {
                    ...results.unlockedBonus,
                    [index]: true,
                  },
                  currencies: {
                    ...results.currencies,
                    [bonus.reward.key]: bonus.reward.value,
                  },
                  notifications: [
                    ...results.notifications,
                    {
                      id: generateNotificationIncrementalBonusId(
                        incrementals[selectedHex],
                        index
                      ),
                      timestamp: currentTime,
                      type: 'inc_bonus',
                      currency: bonus.reward.key,
                      value: bonus.reward.value,
                    },
                  ],
                };
              }
            }

            return results;
          },
          { unlockedBonus: {}, currencies: {}, notifications: [] }
        );
      }

      // Bonus may override the increment value
      let stateUpdateCurrencies = {
        ...state.currency,
        base: (state.currency?.base || 0) + incrementValue,
      };

      const bonusCurrencies = Object.entries(
        bonusEarned.currencies as { string: number }
      ).reduce(
        (results, [key, value]) => ({
          ...results,
          [key]: value + (stateUpdateCurrencies[key as CurrencyType] || 0),
        }),
        {}
      );

      stateUpdateCurrencies = {
        ...stateUpdateCurrencies,
        ...bonusCurrencies,
      };

      return {
        ...state,
        currency: {
          ...stateUpdateCurrencies,
          ...bonusCurrencies,
        },
        incrementals: {
          ...state.incrementals,
          [selectedHex]: {
            ...currentSelectedHex,
            total: (currentSelectedHex.total || 0) + 1,
            lastCounter: currentTime,
            unlockedBonus: {
              ...(currentSelectedHex.unlockedBonus || {}),
              ...bonusEarned.unlockedBonus,
            },
          },
        },
        ...(bonusEarned.notifications.length > 0 && {
          notifications: [...state.notifications, ...bonusEarned.notifications],
        }),
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

    case DELETE_NOTIFICATION_TYPE: {
      const {
        notificationId,
      }: {
        notificationId?: string;
      } = payload;

      if (!notificationId) {
        return state;
      }

      return {
        ...state,
        notifications: state.notifications.filter(
          ({ id }) => id !== notificationId
        ),
      };
    }

    default: {
      return state;
    }
  }
};

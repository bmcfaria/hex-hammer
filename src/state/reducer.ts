import { incrementals } from '../helpers/incrementals';
import { initialHexes } from '../helpers/initialHexes';
import { modalsHex } from '../helpers/modals';
import {
  BonusType,
  CurrencyType,
  ModalHexType,
  ModalTradeType,
  ModalUnlockType,
  ModalUpgradeType,
  NotificationType,
} from '../helpers/types';
import {
  flipsUntilRing,
  generateNotificationIncrementalBonusId,
} from '../helpers/utils';
import { UpgradeKeyType, upgrades } from '../helpers/values';
import {
  BUY_MODAL_EXPAND_TYPE,
  BUY_MODAL_TRADE_TYPE,
  BUY_MODAL_UNLOCK_TYPE,
  BUY_UPGRADE_TYPE,
  DELETE_NOTIFICATION_TYPE,
  DEV_ADD_FUNDS_TYPE,
  DISABLE_TUTORIAL_TYPE,
  INCREMENT_TYPE,
  RESET_TYPE,
  DEV_TOGGLE_TYPE,
  UNLOCK_UPGRADE_TYPE,
} from './actions';

interface IncrementalType {
  unlocked: boolean;
  total: number;
  lastCounter: number;
  currency: CurrencyType;
  upgrades: { [key in UpgradeKeyType]: number };
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
interface UpgradeType {
  levelLock: number;
}
const upgradesState: { [index: string]: UpgradeType } = {};

const notificationsState: NotificationType[] = [];

const modalHexUpgrade: { [index: string]: any } = {};
const trades: { [index: string]: boolean } = {};
export const initialState = {
  devMode: false,
  currency: {
    base: undefined as number | undefined,
    red: undefined as number | undefined,
    blue: undefined as number | undefined,
    dark: undefined as number | undefined,
  },
  incrementals: incrementalsState,
  upgrades: upgradesState,
  modalHex: {
    ...initialHexes[0],
  },
  modalHexUpgrade,
  trades,
  notifications: notificationsState,
  tutorial: {
    mainButton: true,
    statusBarControlsInfo: true,
    statusBarControlsGoUp: true,
    sidebar: true,
    secondStageMovement: true,
  },
};

export const reducer = (state = initialState, payload: any) => {
  switch (payload.type) {
    case RESET_TYPE: {
      return {
        ...initialState,
      };
    }

    case DEV_TOGGLE_TYPE: {
      return {
        ...state,
        devMode: !state.devMode,
      };
    }

    case DEV_ADD_FUNDS_TYPE: {
      return {
        ...state,
        currency: {
          ...state.currency,
          base: (state.currency.base || 0) + 100,
          red: (state.currency.red || 0) + 100,
          blue: (state.currency.blue || 0) + 100,
          dark: (state.currency.dark || 0) + 100,
        },
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
        tutorial: {
          ...state.tutorial,
          mainButton: false,
        },
      };
    }

    case BUY_UPGRADE_TYPE: {
      const {
        upgradeId,
        selectedHex,
        currency,
      }: {
        upgradeId: UpgradeKeyType;
        selectedHex: string;
        currency?: CurrencyType;
      } = payload;

      const selectedCurrency = currency || 'base';

      // TODO: do proper type check
      const { price: priceArray, levelLock } = upgrades[upgradeId] as any;

      const currentLockLevel = state.upgrades[upgradeId]?.levelLock || 0;
      const currentLock = levelLock[currentLockLevel];

      const currentSelectedHex = state.incrementals[selectedHex] || {
        upgrades: {},
      };
      const currenctUpgradeValue = ~~currentSelectedHex.upgrades?.[upgradeId];
      const price = priceArray[currenctUpgradeValue];

      if (
        !price ||
        (state.currency[selectedCurrency] || 0) < price ||
        !selectedHex ||
        currenctUpgradeValue + 1 >= currentLock
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
              [upgradeId]: currenctUpgradeValue + 1,
            },
          },
        },
      };
    }

    case UNLOCK_UPGRADE_TYPE: {
      const {
        upgradeId,
        modalId,
      }: { upgradeId: UpgradeKeyType; modalId: ModalHexType } = payload;

      const { prices: priceArray, type, currency, lockIndex } = modalsHex[
        modalId
      ] as ModalUpgradeType;

      const selectedCurrency = currency || 'base';

      const price = priceArray[0];

      const isNextUpgrade =
        (state.upgrades[upgradeId]?.levelLock || 0) + 1 === lockIndex;

      if (
        type !== 'upgrade' ||
        !price ||
        (state.currency[selectedCurrency] || 0) < price ||
        !modalId ||
        !isNextUpgrade
      ) {
        return state;
      }

      return {
        ...state,
        upgrades: {
          ...state.upgrades,
          [upgradeId]: {
            ...(state.upgrades[upgradeId] || {}),
            levelLock: lockIndex,
          },
        },
      };
    }

    case BUY_MODAL_EXPAND_TYPE: {
      const {
        modalId,
        currency,
      }: {
        modalId: ModalHexType;
        currency?: CurrencyType;
      } = payload;
      const { prices, type } = modalsHex[modalId];

      const selectedCurrency = currency || 'base';

      let price = prices[~~state.modalHexUpgrade[modalId]];

      if (
        !price ||
        (state.currency[selectedCurrency] || 0) < price ||
        state.modalHexUpgrade[modalId] >= 2 ||
        type !== 'expand'
      ) {
        return state;
      }

      let newValues = {};
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
              [`hex_${tmpRing}_${diff < 0 ? tmpRing * 6 + diff : diff}`]: true,
            };
          },
          {}
        );

        return {
          ...results,
          ...indexResults,
        };
      }, {});

      return {
        ...state,
        currency: {
          ...state.currency,
          [selectedCurrency]: (state.currency[selectedCurrency] || 0) - price,
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
      };
    }

    case BUY_MODAL_TRADE_TYPE: {
      const {
        modalId,
        multiplier,
        invert,
      }: {
        modalId: ModalHexType;
        multiplier: number;
        invert?: boolean;
      } = payload;

      const {
        rate,
        type,
        currency,
        convertTo,
      }: {
        rate: number;
        type: string;
        currency: CurrencyType;
        convertTo: CurrencyType;
      } = modalsHex[modalId] as ModalTradeType;

      const selectedCurrency = !!invert ? convertTo : currency;
      const convertToCurrency = !!invert ? currency : convertTo;
      const price = !!invert ? multiplier : rate * multiplier;
      const convertedAmount = !!invert ? rate * multiplier : multiplier;

      if (type !== 'trade' || (state.currency[selectedCurrency] || 0) < price) {
        return state;
      }

      return {
        ...state,
        currency: {
          ...state.currency,
          [selectedCurrency]: (state.currency[selectedCurrency] || 0) - price,
          [convertToCurrency]:
            (state.currency[convertToCurrency] || 0) + convertedAmount,
        },
        trades: {
          ...state.trades,
          [modalId]: true,
        },
      };
    }

    case BUY_MODAL_UNLOCK_TYPE: {
      const {
        modalId,
      }: {
        modalId: ModalHexType;
      } = payload;

      const {
        type,
        currency,
        prices,
      }: {
        type: string;
        currency: CurrencyType;
        prices: number[];
      } = modalsHex[modalId] as ModalUnlockType;

      const price = prices[0];

      const alreadyUnlocked = state.incrementals[modalId]?.unlocked;

      if (
        type !== 'unlock' ||
        (state.currency[currency] || 0) < price ||
        alreadyUnlocked
      ) {
        return state;
      }

      return {
        ...state,
        currency: {
          ...state.currency,
          [currency]: (state.currency[currency] || 0) - price,
        },
        incrementals: {
          ...state.incrementals,
          [modalId]: {
            ...(state.incrementals[modalId] || {}),
            unlocked: true,
          },
        },
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

    case DISABLE_TUTORIAL_TYPE: {
      const {
        tutorialKey,
      }: {
        tutorialKey: string;
      } = payload;

      if (!tutorialKey) {
        return state;
      }

      return {
        ...state,
        tutorial: {
          ...state.tutorial,
          [tutorialKey]: false,
        },
      };
    }

    default: {
      return state;
    }
  }
};

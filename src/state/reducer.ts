import {
  modalHex,
  ModalHexTypes,
  upgrades,
  UpgradeTypes,
} from '../helpers/values';
import {
  BUY_MODAL_HEX_TYPE,
  BUY_UPGRADE_TYPE,
  INCREMENT_TYPE,
} from './actions';

export const initialState = {
  counter: 0,
  lastCounter: 0,
  upgrades: {
    auto: 0,
    increment: 0,
  },
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
  modalHexUpgrade: {
    hex_2_0: 0,
    hex_2_2: 0,
    hex_2_4: 0,
    hex_2_6: 0,
    hex_2_8: 0,
    hex_2_10: 0,
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

    case BUY_MODAL_HEX_TYPE: {
      const { modalId }: { modalId: ModalHexTypes } = payload;
      const { price, type } = modalHex[modalId];

      if (
        !price ||
        state.counter < price ||
        state.modalHexUpgrade[modalId] >= 2
      ) {
        return state;
      }

      let newValues = {};
      if (type === 'expand') {
        // Activate more hexes
        const values = modalId.split('_');
        const currentRing = ~~values[1];
        const currentIndex = ~~values[2];

        const ringRange = [3, 5][state.modalHexUpgrade[modalId]];

        console.log(ringRange, state.modalHexUpgrade[modalId]);

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
            // [`hex_${tmpRing}_${tmpIndex}`]: true,
          };
        }, {});

        console.log(newValues);
      }

      return {
        ...state,
        counter: state.counter - price,
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

    default: {
      return state;
    }
  }
};

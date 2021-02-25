import stringsObject from '../helpers/strings.json';

export const incrementals: { [index: string]: any } = {
  hex_0_0: {
    name: 'Central Hex',
    bonusModels: [
      [2, 0, 'expand'],
      [2, 2, 'expand'],
      [2, 4, 'expand'],
      [2, 6, 'expand'],
      [2, 8, 'expand'],
      [2, 10, 'expand'],
    ],
    bonus: [
      {
        name: stringsObject.modal.info.bonus[0],
        type: 'atRing',
        value: 2,
      },
    ],
    flipsToExpand: 5,
    maxRings: 5,
    mainCurrency: 'base',
    breakFree: 5,
  },
};

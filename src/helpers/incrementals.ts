import stringsObject from '../helpers/strings.json';

const centralIncremental = [
  {
    name: 'Central Inc',
    bonusModels: [
      [2, 0, 'expand'],
      [2, 1, 'expand'],
      [2, 2, 'expand'],
      [2, 3, 'expand'],
      [2, 4, 'expand'],
      [2, 5, 'expand'],
      [2, 6, 'expand'],
      [2, 7, 'expand'],
      [2, 8, 'expand'],
      [2, 9, 'expand'],
      [2, 10, 'expand'],
      [2, 11, 'expand'],
    ],
    bonus: [
      {
        name: stringsObject.modal.info.bonus[0],
        type: 'atRing',
        value: 2,
        reward: {
          type: 'currency',
          key: 'blue',
          value: 12,
        },
      },
    ],
    flipsToExpand: 2,
    maxRings: 3,
    mainCurrency: 'base',
    breakFree: 3,
  },
  {
    name: 'Central Inc',
    bonusModels: [
      [2, 0, 'expand'],
      [2, 1, 'expand'],
      [2, 2, 'expand'],
      [2, 3, 'expand'],
      [2, 4, 'expand'],
      [2, 5, 'expand'],
      [2, 6, 'expand'],
      [2, 7, 'expand'],
      [2, 8, 'expand'],
      [2, 9, 'expand'],
      [2, 10, 'expand'],
      [2, 11, 'expand'],
    ],
    bonus: [
      {
        name: stringsObject.modal.info.bonus[0],
        type: 'atRing',
        value: 2,
        reward: {
          type: 'currency',
          key: 'blue',
          value: 12,
        },
      },
    ],
    flipsToExpand: 3,
    maxRings: 3,
    mainCurrency: 'base',
    breakFree: 3,
  },
];

export const incrementals: { [index: string]: any } = {
  hex_0_0: centralIncremental,
  hex_5_0: [
    {
      name: 'East Inc',
      bonusModels: [],
      bonus: [],
      flipsToExpand: 5,
      maxRings: 5,
      mainCurrency: 'base',
      breakFree: 5,
    },
  ],
  hex_5_5: [
    {
      name: 'North/East Inc',
      bonusModels: [],
      bonus: [],
      flipsToExpand: 5,
      maxRings: 5,
      mainCurrency: 'base',
      breakFree: 5,
    },
  ],
  hex_5_10: [
    {
      name: 'North/West Inc',
      bonusModels: [],
      bonus: [],
      flipsToExpand: 5,
      maxRings: 5,
      mainCurrency: 'base',
      breakFree: 5,
    },
  ],
  hex_5_15: [
    {
      name: 'West Inc',
      bonusModels: [],
      bonus: [],
      flipsToExpand: 2,
      maxRings: 3,
      mainCurrency: 'base',
      breakFree: 3,
    },
  ],
  hex_5_20: [
    {
      name: 'South/West Inc',
      bonusModels: [],
      bonus: [],
      flipsToExpand: 5,
      maxRings: 5,
      mainCurrency: 'base',
      breakFree: 5,
    },
  ],
  hex_5_25: [
    {
      name: 'South/East Inc',
      bonusModels: [],
      bonus: [],
      flipsToExpand: 5,
      maxRings: 5,
      mainCurrency: 'base',
      breakFree: 5,
    },
  ],
};

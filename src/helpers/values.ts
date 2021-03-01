import stringsObject from '../helpers/strings.json';

export const upgrades = {
  auto: {
    price: [1, 2, 3, 4, 5, 6, 7],
    name: 'Auto',
    description1: ['Auto click'],
    description2: [
      '(every 6s)',
      '(every 5s)',
      '(every 4s)',
      '(every 3s)',
      '(every 2s)',
      '(every 1s)',
      '(every 0.5s)',
    ],
    value: [6, 5, 4, 3, 2, 1, 0.5],
  },
  increment: {
    price: [1, 2, 3, 4, 5, 6, 7],
    name: '+1',
    description1: ['+1', '+2', '+3', '+4', '+5', '+6', '+7'],
    description2: ['per flip'],
    value: [1, 2, 3, 4, 5, 6, 7],
  },
  interval: {
    price: [5, 10],
    name: 'Button refresh',
    description1: ['-> 1s', '-> 0.5'],
    description2: ['between clicks'],
    value: [2, 1, 0.5],
  },
};

export type UpgradeType = keyof typeof upgrades;

export const modalHex = {
  hex_2_0: {
    name: 'hex_2_0',
    title: stringsObject.modal.expand.title,
    description: stringsObject.modal.expand.description,
    type: 'expand',
    currency: 'base',
    prices: [1, 1],
  },
  hex_2_2: {
    name: 'hex_2_2',
    title: stringsObject.modal.expand.title,
    description: stringsObject.modal.expand.description,
    type: 'expand',
    currency: 'base',
    prices: [1, 1],
  },
  hex_2_4: {
    name: 'hex_2_4',
    title: stringsObject.modal.expand.title,
    description: stringsObject.modal.expand.description,
    type: 'expand',
    currency: 'base',
    prices: [1, 1],
  },
  hex_2_6: {
    name: 'hex_2_6',
    title: stringsObject.modal.expand.title,
    description: stringsObject.modal.expand.description,
    type: 'expand',
    currency: 'base',
    prices: [1, 1],
  },
  hex_2_8: {
    name: 'hex_2_8',
    title: stringsObject.modal.expand.title,
    description: stringsObject.modal.expand.description,
    type: 'expand',
    currency: 'base',
    prices: [1, 1],
  },
  hex_2_10: {
    name: 'hex_2_10',
    title: stringsObject.modal.expand.title,
    description: stringsObject.modal.expand.description,
    type: 'expand',
    currency: 'base',
    prices: [1, 1],
  },
  hex_2_9: {
    name: 'hex_2_9',
    title: stringsObject.modal.trade.title,
    description: stringsObject.modal.trade.description,
    type: 'trade',
    currency: 'base',
    convertTo: 'red',
    multiplier: [1, 10, 99],
    prices: [1, 10, 80],
  },
  hex_5_0: {
    name: 'hex_5_0',
    title: stringsObject.modal.unlock.title,
    description: stringsObject.modal.unlock.description,
    type: 'unlock',
    currency: 'red',
    prices: [100],
  },
};
export type ModalHexType = keyof typeof modalHex;

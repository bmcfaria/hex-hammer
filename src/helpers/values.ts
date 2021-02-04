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
};

export type UpgradeTypes = keyof typeof upgrades;

export const modalHex = {
  hex_2_0: {
    price: 1,
    name: 'hex_2_0',
    description: 'Some description',
    type: 'expand',
  },
  hex_2_2: {
    price: 1,
    name: 'hex_2_2',
    description: 'Some description',
    type: 'expand',
  },
  hex_2_4: {
    price: 1,
    name: 'hex_2_4',
    description: 'Some description',
    type: 'expand',
  },
  hex_2_6: {
    price: 1,
    name: 'hex_2_6',
    description: 'Some description',
    type: 'expand',
  },
  hex_2_8: {
    price: 1,
    name: 'hex_2_8',
    description: 'Some description',
    type: 'expand',
  },
  hex_2_10: {
    price: 1,
    name: 'hex_2_10',
    description: 'Some description',
    type: 'expand',
  },
  hex_4_17: {
    price: 1,
    name: 'hex_4_17',
    description: 'Some description',
    type: 'trade',
  },
};
export type ModalHexTypes = keyof typeof modalHex;

export const upgrades = {
  auto: {
    price: [50, 150, 450, 1350, 4050, 12150],
    name: 'Auto click',
    description1: ['Auto click'],
    description2: [
      '(6s -> 5s)',
      '(5s -> 4s)',
      '(4s -> 3s)',
      '(3s -> 2s)',
      '(2s -> 1s)',
      '(1s -> .5s)',
      '(.5s)',
    ],
    value: [6, 5, 4, 3, 2, 1, 0.5],
    currency: 'base',
    levelLock: [6, 7],
  },
  increment: {
    price: [15, 45, 135, 405, 1215, 3645],
    name: 'Increment',
    description1: ['hexs / flip'],
    description2: [
      '(1 -> 2)',
      '(2 -> 3)',
      '(3 -> 4)',
      '(4 -> 5)',
      '(5 -> 6)',
      '(6 -> 7)',
      '(7 -> ?)',
    ],
    value: [1, 2, 3, 4, 5, 6, 7],
    currency: 'base',
    levelLock: [2, 6],
  },
  interval: {
    price: [5, 50],
    name: 'Interval',
    description1: ['interval'],
    description2: ['(2s -> 1s)', '(1s -> .5s)', '(.5s)'],
    value: [2, 1, 0.5],
    currency: 'base',
    levelLock: [2],
  },
};

export const zoomLimit = 30;

export type UpgradeKeyType = keyof typeof upgrades;

export const upgrades = {
  auto: {
    price: [50, 150, 450, 1350, 4050, 12150, 36450],
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
    price: [15, 45, 135, 405, 1215, 3645, 10935],
    name: '+1',
    description1: ['+1', '+2', '+3', '+4', '+5', '+6', '+7'],
    description2: ['per flip'],
    value: [1, 2, 3, 4, 5, 6, 7],
  },
  interval: {
    price: [5, 50],
    name: 'Button refresh',
    description1: ['-> 1s', '-> 0.5'],
    description2: ['between clicks'],
    value: [2, 1, 0.5],
  },
};

export const zoomLimit = 30;

export type UpgradeType = keyof typeof upgrades;

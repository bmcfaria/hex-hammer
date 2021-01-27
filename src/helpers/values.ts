export const upgrades = {
  auto: {
    price: 10,
    name: 'Auto',
    description1: 'Auto click',
    description2: '(every 6s)',
    value: 6,
  },
  increment1: {
    price: 100,
    name: '+1',
    description1: '+1',
    description2: 'per flip',
    value: 1,
  },
};

export type UpgradeTypes = keyof typeof upgrades;

export const upgrades = {
  auto: {
    price: 10,
    name: 'Auto',
    description1: 'Auto click',
    description2: '(every 5s)',
    value: 5,
  },
  increment1: {
    price: 1,
    name: '+1',
    description1: '+1 flip',
    description2: 'per click',
    value: 1,
  },
};

export type UpgradeTypes = keyof typeof upgrades;

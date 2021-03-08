import numbro from 'numbro';

export const flipsUntilRing = (flipsToExpand: number, ring: number) =>
  flipsToExpand ** ring;

export const generateNotificationIncrementalBonusId = (
  incremental: any,
  bonusIndex: number
) => `inc_${incremental.name}_bonus_${bonusIndex}`;

export const formatMoney = (value: number) =>
  numbro(value).format({
    average: true,
    optionalMantissa: true,
    mantissa: 1,
    roundingFunction: Math.floor,
  });

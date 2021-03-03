export const flipsUntilRing = (flipsToExpand: number, ring: number) =>
  flipsToExpand ** ring;

export const generateNotificationIncrementalBonusId = (
  incremental: any,
  bonusIndex: number
) => `inc_${incremental.name}_bonus_${bonusIndex}`;

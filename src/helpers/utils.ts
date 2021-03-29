import numbro from 'numbro';
import { incrementals } from './incrementals';

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

export const convertToColor4IfNecessary = (color: string) => {
  if (color && color.startsWith('#') && color.length === 7) {
    return `${color}ff`;
  }

  return color;
};

export const generateCornersArray = (ring: number) =>
  [...Array(6)].map((_, tmpIndex) => tmpIndex * ring);

export const incrementalInfoReality = (incremental: string, reality: number) =>
  incrementals[incremental][reality] ||
  incrementals[incremental][incrementals[incremental].length - 1];

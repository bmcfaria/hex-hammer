export const initialHexes = {
  test: {
    ...[...Array(6)].reduce(
      (results, _, index) => ({ ...results, [`hex_${1}_${index}`]: true }),
      {}
    ),
    // hex_2_0: true,
    // hex_2_2: true,
    // hex_2_4: true,
    hex_2_6: true,
    // hex_2_8: true,
    // hex_2_10: true,
  },
  0: {
    hex_1_3: true,
    hex_2_6: true,
  },
  1: {
    ...[...Array(6)].reduce(
      (results, _, index) => ({ ...results, [`hex_${1}_${index}`]: true }),
      {}
    ),
    hex_2_2: true,
    hex_2_6: true,
    hex_2_10: true,
    // prestige unlocked
    hex_7_21: true,
  },
  2: {
    ...[...Array(6)].reduce(
      (results, _, index) => ({ ...results, [`hex_${1}_${index}`]: true }),
      {}
    ),
    hex_2_0: true,
    hex_2_2: true,
    hex_2_4: true,
    hex_2_6: true,
    hex_2_8: true,
    hex_2_10: true,
    // prestige unlocked
    hex_7_7: true,
    hex_7_21: true,
    hex_7_35: true,
  },
  3: {
    ...[...Array(6)].reduce(
      (results, _, index) => ({ ...results, [`hex_${1}_${index}`]: true }),
      {}
    ),
    hex_2_0: true,
    hex_2_2: true,
    hex_2_4: true,
    hex_2_6: true,
    hex_2_8: true,
    hex_2_10: true,
    // prestige unlocked
    hex_7_7: true,
    hex_7_14: true,
    hex_7_21: true,
    hex_7_28: true,
    hex_7_35: true,
  },
  4: {
    ...[...Array(6)].reduce(
      (results, _, index) => ({ ...results, [`hex_${1}_${index}`]: true }),
      {}
    ),
    ...[...Array(6 * 2)].reduce(
      (results, _, index) => ({ ...results, [`hex_${2}_${index}`]: true }),
      {}
    ),
    ...[...Array(6 * 3)].reduce(
      (results, _, index) => ({ ...results, [`hex_${3}_${index}`]: true }),
      {}
    ),
    ...[...Array(6 * 4)].reduce(
      (results, _, index) => ({ ...results, [`hex_${4}_${index}`]: true }),
      {}
    ),
    // prestige connectors
    hex_6_0: true,
    hex_6_6: true,
    hex_6_12: true,
    hex_6_18: true,
    hex_6_24: true,
    hex_6_30: true,
    // prestige unlocked
    hex_7_0: true,
    hex_7_7: true,
    hex_7_14: true,
    hex_7_21: true,
    hex_7_28: true,
    hex_7_35: true,
  },
};

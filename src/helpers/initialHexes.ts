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
  },
};

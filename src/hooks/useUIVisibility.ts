import { useSelector } from 'react-redux';
import { incrementals } from '../helpers/incrementals';
import { flipsUntilRing } from '../helpers/utils';
import { incrementalsSelector } from '../state/selectors';

const useUIVisibility = () => {
  const incrementalsState = useSelector(incrementalsSelector);

  const didBreakFree =
    incrementalsState?.hex_0_0?.total >=
    flipsUntilRing(
      incrementals.hex_0_0.flipsToExpand,
      incrementals.hex_0_0.breakFree
    );

  return {
    statusBar: {
      controls: {
        info:
          incrementalsState?.hex_0_0?.total >=
          flipsUntilRing(incrementals.hex_0_0.flipsToExpand, 2),
        name: didBreakFree,
        up: didBreakFree,
      },
    },
  };
};

export default useUIVisibility;

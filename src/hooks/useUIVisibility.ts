import { useSelector } from 'react-redux';
import { incrementals } from '../helpers/incrementals';
import { flipsUntilRing } from '../helpers/utils';
import { devModeSelector, incrementalsSelector } from '../state/selectors';

const useUIVisibility = () => {
  const incrementalsState = useSelector(incrementalsSelector);
  const devMode = useSelector(devModeSelector);

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
            flipsUntilRing(incrementals.hex_0_0.flipsToExpand, 1) || devMode,
        name: didBreakFree || devMode,
        up: didBreakFree || devMode,
      },
    },
  };
};

export default useUIVisibility;

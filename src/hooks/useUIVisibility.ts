import { useSelector } from 'react-redux';
import { flipsUntilRing, incrementalInfoReality } from '../helpers/utils';
import {
  devModeSelector,
  incrementalsSelector,
  realitySelector,
} from '../state/selectors';

const useUIVisibility = () => {
  const incrementalsState = useSelector(incrementalsSelector);
  const reality = useSelector(realitySelector);
  const devMode = useSelector(devModeSelector);

  const baseHexTotal = incrementalsState?.hex_0_0?.total;

  const centralIncrementalInfo = incrementalInfoReality('hex_0_0', reality);

  const didBreakFree =
    baseHexTotal >=
    flipsUntilRing(
      centralIncrementalInfo.flipsToExpand,
      centralIncrementalInfo.breakFree
    );

  return {
    statusBar: {
      controls: {
        info:
          baseHexTotal >=
            flipsUntilRing(centralIncrementalInfo.flipsToExpand, 1) ||
          devMode ||
          reality > 0,
        name: didBreakFree || devMode || reality > 0,
        up: didBreakFree || devMode || reality > 0,
      },
    },
    sidebar:
      baseHexTotal >= flipsUntilRing(centralIncrementalInfo.flipsToExpand, 1) ||
      devMode ||
      reality > 0,
  };
};

export default useUIVisibility;

import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GameObjectContext } from '../helpers/context';
import { incrementalsSelector } from '../state/selectors';

interface IncrementalHandlerProps {
  incrementalId: string;
}

// Shallow component with game logic
// It can be refactored into a hook
// But by using one component per incremental hex, it can has a useEffect per hex
const IncrementalHandler = ({ incrementalId }: IncrementalHandlerProps) => {
  const incremental = useSelector(incrementalsSelector)[incrementalId];
  const { gameObject, scene } = useContext(GameObjectContext);

  useEffect(() => {
    if (
      scene === 'incremental' &&
      gameObject?.current?.selectedHex === incrementalId
    ) {
      const currentTotal = incremental?.total || 0;

      if (gameObject?.current?.mainAction) {
        gameObject.current.mainAction(currentTotal + 1);
      }
    }
  }, [gameObject, incrementalId, incremental, scene]);

  return null;
};

export default IncrementalHandler;

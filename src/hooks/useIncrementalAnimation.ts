import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GameObjectContext } from '../helpers/context';
import { incrementalsSelector } from '../state/selectors';

const useIncrementalAnimation = () => {
  const incrementals = useSelector(incrementalsSelector);
  const { gameObject, scene } = useContext(GameObjectContext);

  useEffect(() => {
    if (scene === 'incremental') {
      Object.entries(incrementals).forEach(
        ([incrementalKey, incrementalValue]) => {
          if (gameObject?.current?.selectedHex === incrementalKey) {
            const currentTotal = (incrementalValue as any)?.total || 0;

            gameObject.current?.mainAction?.(currentTotal + 1);
          }
        }
      );
    }
  }, [gameObject, scene, incrementals]);
};

export default useIncrementalAnimation;

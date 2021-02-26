import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GameObjectContext } from '../helpers/context';
import { incrementalsSelector } from '../state/selectors';

const useIncrementalAnimation = () => {
  const incrementals = useSelector(incrementalsSelector);
  const { gameObject, scene } = useContext(GameObjectContext);

  useEffect(() => {
    if (scene === 'incremental' && gameObject?.current) {
      Object.entries(incrementals).forEach(
        ([incrementalKey, incrementalValue]) => {
          const selectedHex = gameObject.current?.selectedHex;
          if (
            selectedHex === incrementalKey &&
            (incrementalValue as any)?.lastCounter !==
              gameObject.current?.incrementalLastCounter?.[selectedHex]
          ) {
            if (gameObject?.current?.incrementalLastCounter) {
              gameObject.current.incrementalLastCounter[
                selectedHex
              ] = (incrementalValue as any)?.lastCounter;
            }
            const currentTotal = (incrementalValue as any)?.total || 0;

            gameObject.current?.mainAction?.(currentTotal);
          }
        }
      );
    }
  }, [gameObject, scene, incrementals]);
};

export default useIncrementalAnimation;

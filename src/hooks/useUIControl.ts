import { useContext, useEffect, useState } from 'react';
import { GameObjectContext } from '../helpers/context';

const useUIControl = () => {
  const { gameObject } = useContext(GameObjectContext);
  const [isCentered, setIsCentered] = useState(true);

  useEffect(() => {
    if (gameObject?.current) {
      gameObject.current.ui.setSecondStageCoordinates = (x, z) => {
        setIsCentered(x === 0 || z === 0);
      };
    }
  }, [gameObject]);

  const center = () => {
    gameObject?.current?.ui?.center?.();
  };

  const minus = () => {
    gameObject?.current?.ui?.zoomOut?.();
  };

  const plus = () => {
    gameObject?.current?.ui?.zoomIn?.();
  };

  return {
    center,
    minus,
    plus,
    isCentered,
  };
};

export default useUIControl;

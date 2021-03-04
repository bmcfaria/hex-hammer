import { useContext, useEffect, useState } from 'react';
import { GameObjectContext } from '../helpers/context';
import { zoomLimit } from '../helpers/values';

const useUIControl = () => {
  const { gameObject } = useContext(GameObjectContext);
  const [isCentered, setIsCentered] = useState(true);
  const [zoomValue, setZoomValue] = useState(0);

  useEffect(() => {
    if (gameObject?.current) {
      gameObject.current.ui.setZoom = value => {
        setZoomValue(value);
      };
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
    isCentered,
    minus,
    plus,
    isMaxZoom: zoomValue < zoomLimit,
  };
};

export default useUIControl;

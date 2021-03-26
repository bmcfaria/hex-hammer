import { useContext } from 'react';
import { GameObjectContext } from '../helpers/context';

const useScene = () => {
  const { gameObject } = useContext(GameObjectContext);

  const openIncremental = (selectedHex: string) => {
    gameObject?.current?.changeScene?.('incremental', selectedHex);
  };

  const openSecondStage = () => {
    gameObject?.current?.changeScene('secondStage');
  };

  const resetSecondStage = () => {
    gameObject?.current?.sceneInitialization?.secondStageScene?.();
  };

  return { openIncremental, openSecondStage, resetSecondStage };
};

export default useScene;

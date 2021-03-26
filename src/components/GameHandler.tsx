import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GameObjectContext } from '../helpers/context';
import useIncrementalAnimation from '../hooks/useIncrementalAnimation';
import useScene from '../hooks/useScene';
import { realitySelector, prestigeSelector } from '../state/selectors';

// Shallow component just to load and handle game related hooks
const GameHandler = () => {
  const { gameObject } = useContext(GameObjectContext);
  const reality = useSelector(realitySelector);
  const prestige = useSelector(prestigeSelector);
  const { openIncremental } = useScene();

  // Flip animations for the incremental scene
  useIncrementalAnimation();

  // Update reality
  useEffect(() => {
    if (gameObject?.current) {
      gameObject.current.reality = reality;
    }
  }, [gameObject, reality]);

  useEffect(() => {
    gameObject?.current?.sceneInitialization?.secondStageScene?.();
    openIncremental('hex_0_0');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prestige]);

  return null;
};

export default GameHandler;

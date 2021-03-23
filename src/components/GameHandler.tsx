import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GameObjectContext } from '../helpers/context';
import useIncrementalAnimation from '../hooks/useIncrementalAnimation';
import { realitySelector } from '../state/selectors';

// Shallow component just to load and handle game related hooks
const GameHandler = () => {
  const { gameObject } = useContext(GameObjectContext);
  const reality = useSelector(realitySelector);

  // Flip animations for the incremental scene
  useIncrementalAnimation();

  useEffect(() => {
    if (gameObject?.current) {
      gameObject.current.reality = reality;
    }
  }, [gameObject, reality]);

  return null;
};

export default GameHandler;

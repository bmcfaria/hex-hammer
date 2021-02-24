import useIncrementalAnimation from '../hooks/useIncrementalAnimation';

// Shallow component just to load and handle game related hooks
const GameHandler = () => {
  // Flip animations for the incremental scene
  useIncrementalAnimation();

  return null;
};

export default GameHandler;

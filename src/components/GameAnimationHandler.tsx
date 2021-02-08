import { useSelector } from 'react-redux';
import { incrementalsSelector } from '../state/selectors';
import IncrementalHandler from './IncrementalHandler';

const GameAnimationHandler = () => {
  const incrementals = useSelector(incrementalsSelector);

  return (
    <>
      {Object.keys(incrementals).map(incrementalId => (
        <IncrementalHandler incrementalId={incrementalId} key={incrementalId} />
      ))}
    </>
  );
};

export default GameAnimationHandler;

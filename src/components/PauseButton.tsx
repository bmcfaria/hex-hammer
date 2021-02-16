import { ReactComponent as Pause } from '../assets/Pause.svg';
import StatusBarButton from './StatusBarButton';

const PauseButton = () => {
  // const active = false;
  return (
    <StatusBarButton side="left" onClick={() => console.log('Pause')}>
      <Pause />
    </StatusBarButton>
  );
};

export default PauseButton;

import './App.css';
import Babylon from './Babylon';
import { Scene } from '@babylonjs/core';
import HammerButton from './components/HammerButton';
import StatusBar from './components/StatusBar';
import Modal from './components/Modal';
import GameHandler from './components/GameHandler';
import ZoomControls from './components/ZoomControls';
import MovementTutorial from './components/MovementTutorial';
import AppProviders from './AppProviders';

const onRender = (scene: Scene) => {
  let divFps = document.getElementById('fps');
  if (divFps) {
    divFps.innerHTML = scene.getEngine().getFps().toFixed() + ' fps';
  }
};

function App() {
  return (
    <AppProviders>
      <GameHandler />
      <div className="App">
        <Babylon antialias onRender={onRender} id="my-canvas" />
        <StatusBar />
        <HammerButton />
        <div
          id="fps"
          style={{
            position: 'absolute',
            bottom: 15,
            right: 10,
            backgroundColor: 'black',
            border: '2px solid red',
            textAlign: 'center',
            fontSize: 16,
            color: 'white',
            width: 60,
            height: 20,
          }}
        >
          0
        </div>
      </div>
      <ZoomControls />
      <Modal />
      <MovementTutorial />
    </AppProviders>
  );
}

export default App;

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import './App.css';
import Babylon from './Babylon';
import { Scene } from '@babylonjs/core';
import createScene from './babylon/helper';
import { createSceneSecondStage } from './babylon/sceneSecondStage';
import HammerButton from './components/HammerButton';
import { initialState, reducer } from './state/reducer';
import StatusBar from './components/StatusBar';

const inDev = process.env.NODE_ENV === 'development';
const composeEnhancers =
  (inDev && window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(reducer, initialState, composeEnhancers());

const onRender = (scene: Scene) => {
  let divFps = document.getElementById('fps');
  if (divFps) {
    divFps.innerHTML = scene.getEngine().getFps().toFixed() + ' fps';
  }
};

interface RefObject {
  mainAction: () => void;
  scene: number;
}

function App() {
  const sharedBabylonObject = useRef<RefObject>();

  const switchScene = () => {
    if (sharedBabylonObject.current) {
      sharedBabylonObject.current.scene = !sharedBabylonObject.current.scene
        ? 1
        : 0;
    }
  };

  return (
    <Provider store={store}>
      <div
        className="App"
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Babylon
          antialias
          onSceneReady={createScene(sharedBabylonObject)}
          onSceneReady1={createSceneSecondStage(sharedBabylonObject)}
          onRender={onRender}
          sharedBabylonObject={sharedBabylonObject}
          id="my-canvas"
        />
        <StatusBar />
        <div className="hexagon-button-container">
          <HammerButton sharedBabylonObject={sharedBabylonObject} />
        </div>
        <div
          id="fps"
          style={{
            position: 'absolute',
            bottom: 15,
            left: 10,
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
        <button
          onClick={switchScene}
          style={{
            position: 'absolute',
            bottom: 15,
            right: 10,
          }}
        >
          Switch scene
        </button>
      </div>
    </Provider>
  );
}

export default App;

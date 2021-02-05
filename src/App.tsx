import { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import './App.css';
import Babylon from './Babylon';
import { Scene } from '@babylonjs/core';
import createScene from './babylon/helper';
import {
  createSceneSecondStage,
  onRenderSecondStage,
} from './babylon/sceneSecondStage';
import HammerButton from './components/HammerButton';
import { initialState, reducer } from './state/reducer';
import StatusBar from './components/StatusBar';
import Modal from './components/Modal';
import { GameObjectContext } from './helpers/context';
import { GameObjectRefType, SceneType } from './helpers/types';

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

function App() {
  const sharedBabylonObject = useRef<GameObjectRefType>();
  const [scene, setScene] = useState<SceneType>('incremental');

  useEffect(() => {
    if (sharedBabylonObject.current) {
      sharedBabylonObject.current.scene = 'incremental';
      sharedBabylonObject.current.selectedHex = 'hex_0_0';
      sharedBabylonObject.current.changeScene = (
        tmpScene: SceneType,
        selectedHex?: string
      ) => {
        if (sharedBabylonObject.current) {
          sharedBabylonObject.current.scene = tmpScene;
          sharedBabylonObject.current.selectedHex = selectedHex;
        }

        setScene(tmpScene);
      };
    }
  }, [sharedBabylonObject]);

  const switchScene = () => {
    if (sharedBabylonObject.current) {
      switch (sharedBabylonObject.current.scene) {
        case 'incremental':
          sharedBabylonObject.current.changeScene('secondStage');
          break;
        case 'secondStage':
          sharedBabylonObject.current.changeScene('incremental', 'hex_0_0');
          break;
        default:
          sharedBabylonObject.current.changeScene('secondStage');
      }
    }
  };

  return (
    <Provider store={store}>
      <GameObjectContext.Provider
        value={{ gameObject: sharedBabylonObject, scene: scene }}
      >
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
            onRenderSecondStage={onRenderSecondStage}
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
          <Modal sharedBabylonObject={sharedBabylonObject} />
        </div>
      </GameObjectContext.Provider>
    </Provider>
  );
}

export default App;

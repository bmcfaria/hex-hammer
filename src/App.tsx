import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import Babylon from './Babylon';
import { Scene } from '@babylonjs/core';
import createScene from './babylon/helper';
import HammerButton from './components/HammerButton';
import { initialState, reducer } from './state/reducer';
import StatusBar from './components/StatusBar';

const store = createStore(reducer, initialState);

const onRender = (scene: Scene) => {
  let divFps = document.getElementById('fps');
  if (divFps) {
    divFps.innerHTML = scene.getEngine().getFps().toFixed() + ' fps';
  }
};

interface RefObject {
  mainAction: () => void;
}

function App() {
  const sharedBabylonObject = useRef<RefObject>();

  const onClickBaam = () => {
    if (sharedBabylonObject?.current?.mainAction) {
      sharedBabylonObject.current.mainAction();
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
        }}
      >
        <Babylon
          antialias
          onSceneReady={createScene(sharedBabylonObject)}
          onRender={onRender}
          id="my-canvas"
        />
        <StatusBar />
        <div className="hexagon-button-container">
          <HammerButton onClickBaam={onClickBaam} />
        </div>
        <div
          id="fps"
          style={{
            position: 'absolute',
            top: 15,
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
    </Provider>
  );
}

export default App;

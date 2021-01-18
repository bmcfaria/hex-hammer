import React from 'react';
import './App.css';
import Babylon from './Babylon';
import { Scene } from '@babylonjs/core';
import createScene from './babylon/helper';

const onRender = (scene: Scene) => {
  let divFps = document.getElementById('fps');
  if (divFps) {
    divFps.innerHTML = scene.getEngine().getFps().toFixed() + ' fps';
  }
};

function App() {
  const sharedBabylonObject = { mainAction: () => {} };

  const onClickBaam = () => {
    sharedBabylonObject.mainAction();
  };
  return (
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
      <button onClick={onClickBaam} className="hexagon-button">
        Baam!!!
      </button>
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
  );
}

export default App;

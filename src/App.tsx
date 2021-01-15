import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';
import Babylon from './Babylon';
import {
  FreeCamera,
  Vector3,
  HemisphericLight,
  MeshBuilder,
  Mesh,
  Scene,
} from '@babylonjs/core';
import createScene from './babylon/helper';

let box: Mesh;

const onSceneReady = (scene: Scene) => {
  // // This creates and positions a free camera (non-mesh)
  // var camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
  // // This targets the camera to scene origin
  // camera.setTarget(Vector3.Zero());
  // const canvas = scene.getEngine().getRenderingCanvas();
  // // This attaches the camera to the canvas
  // camera.attachControl(canvas, true);
  // // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  // var light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
  // // Default intensity is 1. Let's dim the light a small amount
  // light.intensity = 0.7;
  // // Our built-in 'box' shape.
  // box = MeshBuilder.CreateBox('box', { size: 2 }, scene);
  // // Move the box upward 1/2 its height
  // box.position.y = 1;
  // // Our built-in 'ground' shape.
  // MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene);

  createScene(scene);
};
/**
 * Will run on every frame render.  We are spinning the box on y-axis.
 */
const onRender = (scene: Scene) => {
  if (box !== undefined) {
    var deltaTimeInMillis = scene.getEngine().getDeltaTime();
    const rpm = 10;
    box.rotation.y += (rpm / 60) * Math.PI * 2 * (deltaTimeInMillis / 1000);
  }

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
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
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

import * as BABYLON from '@babylonjs/core';
import { Scene } from '@babylonjs/core';
import {
  buildGround,
  turnCentralAnimation,
  turnRingsAnimations,
} from './GroundHelper';

// https://playground.babylonjs.com/#WPUT6K#38

const createScene = (sharedBabylonObject: any) => (scene: Scene) => {
  // This creates a basic Babylon Scene object (non-mesh)
  //   let scene = new BABYLON.Scene(engine);
  scene.ambientColor = new BABYLON.Color3(1, 1, 1);

  // This creates and positions a free camera (non-mesh)
  //let camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 50, 0), scene);
  const camera = new BABYLON.ArcRotateCamera(
    'camera',
    -Math.PI / 2,
    Math.PI / 4,
    15,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );

  //const camera = new BABYLON.ArcRotateCamera("camera", 0, Math.PI / 2.5, 20, new BABYLON.Vector3(0, 0, 0), scene);

  // This targets the camera to scene origin
  //camera.setTarget(BABYLON.Vector3.Zero());

  // This attaches the camera to the canvas
  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  let light = new BABYLON.HemisphericLight(
    'light',
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  // light.diffuse = new BABYLON.Color3(1, 0, 0);
  // light.specular = new BABYLON.Color3(0, 1, 0);
  // light.groundColor = new BABYLON.Color3(0, 1, 0);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.5;

  const [polygonPivot, polygonsObject] = buildGround(scene);

  const materials = [...Array(5)].map((_, index) => {
    const material = new BABYLON.StandardMaterial(`material_${index}`, scene);
    material.ambientColor = new BABYLON.Color3(
      Math.random(),
      Math.random(),
      Math.random()
    );
    return material;
  });

  let activeRow = 0;
  let rowCounters = Array(polygonsObject.length + 1).fill(0);

  let counter = 0;

  sharedBabylonObject.current = {};
  sharedBabylonObject.current.mainAction = () => {
    turnCentralAnimation(
      polygonPivot,
      materials[rowCounters[activeRow] % materials.length],
      scene
    );
    rowCounters[activeRow]++;

    counter++;

    turnRingsAnimations(counter, polygonsObject, materials, scene);

    if (counter >= 1) {
      camera.radius = 15 + ~~(Math.log(counter) / Math.log(5)) * 15;
    }
  };

  return scene;
};

export default createScene;

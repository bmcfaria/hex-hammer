import * as BABYLON from '@babylonjs/core';
import { Scene } from '@babylonjs/core';
import {
  buildGround,
  turnCentralAnimation,
  turnRingsAnimations,
} from './GroundHelper';
import { createRingPolygon, createLatheHex } from './GroundHex';

// https://playground.babylonjs.com/#WPUT6K#38

export const createSceneMap = (sharedBabylonObject: any) => (scene: Scene) => {
  scene.ambientColor = new BABYLON.Color3(1, 1, 1);

  // This creates and positions a free camera (non-mesh)
  const camera = new BABYLON.ArcRotateCamera(
    'camera_map',
    -Math.PI / 2,
    Math.PI / 4,
    15,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );

  // This targets the camera to scene origin
  camera.setTarget(BABYLON.Vector3.Zero());

  camera.radius = 90;

  // This attaches the camera to the canvas
  const canvas = scene.getEngine().getRenderingCanvas();
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  let light = new BABYLON.HemisphericLight(
    'light',
    new BABYLON.Vector3(0, 1, 0),
    scene
  );

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.5;

  const polygonOrientation = 1; // 0 - flat || 1 - pointy
  const radius = 2;
  let shape = [];
  for (let i = 0; i < 6; i++) {
    shape.push(
      new BABYLON.Vector3(
        radius * Math.cos((i * Math.PI) / 3),
        0,
        radius * Math.sin((i * Math.PI) / 3)
      )
    );
  }

  let polygon = BABYLON.MeshBuilder.ExtrudePolygon(
    'polygon',
    { shape: shape, depth: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE },
    scene
  );
  polygon.position.y = 1;
  polygon.rotation.y = polygonOrientation ? Math.PI / 2 : 0;

  const materialCentral = new BABYLON.StandardMaterial(
    `material_central`,
    polygon.getScene()
  );
  materialCentral.ambientColor = new BABYLON.Color3(1, 0, 0);
  polygon.material = materialCentral;

  const lathe = createLatheHex('lathe_central', scene);
  const latheMaterial = new BABYLON.StandardMaterial(
    `material_lathe`,
    polygon.getScene()
  );
  latheMaterial.ambientColor = new BABYLON.Color3(0, 0, 0);
  lathe.material = latheMaterial;

  const commonHexMaterial = new BABYLON.StandardMaterial(
    'material_common_hex',
    polygon.getScene()
  );
  commonHexMaterial.ambientColor = new BABYLON.Color3(1, 1, 1);

  const borderHexMaterial = new BABYLON.StandardMaterial(
    'material_border_hex',
    polygon.getScene()
  );
  borderHexMaterial.ambientColor = new BABYLON.Color3(0, 0, 0);

  [...Array(5)].map((_, index) =>
    [...Array(6 * (index + 1))].map(
      createRingPolygon(polygon, index + 1, false, {
        meshMaterial: commonHexMaterial,
        latheMaterial: borderHexMaterial,
      })
    )
  );

  [1, 3, 5, 7, 9, 11].forEach(index => {
    scene.getMeshByName(`hex_${2}_${index}`)?.setEnabled(false);
  });
  [...Array(6 * 3)].forEach((_, index) => {
    scene.getMeshByName(`hex_${3}_${index}`)?.setEnabled(false);
  });
  [...Array(6 * 4)].forEach((_, index) => {
    scene.getMeshByName(`hex_${4}_${index}`)?.setEnabled(false);
  });
  [...Array(6 * 5)].forEach((_, index) => {
    (
      scene.getMeshByName(`hex_${5}_${index}`) || { material: null }
    ).material = latheMaterial;
  });

  [0, 5, 10, 15, 20, 25, 30].forEach(index => {
    (
      scene.getMeshByName(`lathe_${5}_${index}`) || { material: null }
    ).material = materialCentral;
  });

  const particleSystem = BABYLON.ParticleHelper.CreateDefault(
    new BABYLON.Vector3(0, 0, 0)
  );
  particleSystem.emitter = polygon;
  particleSystem.start();

  return scene;
};

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

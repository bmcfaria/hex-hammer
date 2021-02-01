import * as BABYLON from '@babylonjs/core';
import { Scene, Vector3 } from '@babylonjs/core';
import { createRingPolygon, createLatheHex } from './GroundHex';

export const createSceneSecondStage = (sharedBabylonObject: any) => (
  scene: Scene
) => {
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

  const blueHexMaterial = new BABYLON.StandardMaterial(
    'material_blue_hex',
    polygon.getScene()
  );
  blueHexMaterial.ambientColor = new BABYLON.Color3(0, 0, 1);

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
  [0, 2, 4, 6, 8, 10].forEach(index => {
    (
      scene.getMeshByName(`hex_${2}_${index}`) || { material: null }
    ).material = blueHexMaterial;
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

  // console.log(camera.position);
  // console.log(polygon.position);

  // camera.position.x = polygon.position.x + 100;
  // camera.position.y = polygon.position.y + 100;

  const vector = new Vector3(0, camera.position.y, camera.position.z);

  const lightDiffuseAction = (callback?: (() => void) | undefined) =>
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.NothingTrigger,
      light,
      'diffuse',
      BABYLON.Color3.Black(),
      1000,
      undefined,
      undefined,
      callback
    );

  const zoomInAction = (
    mesh: BABYLON.AbstractMesh,
    callback?: (() => void) | undefined
  ) =>
    new BABYLON.InterpolateValueAction(
      BABYLON.ActionManager.NothingTrigger,
      camera,
      'position',
      new Vector3(mesh.position.x, camera.position.y, mesh.position.z),
      10000,
      undefined,
      undefined,
      callback
    );

  polygon.actionManager = new BABYLON.ActionManager(scene);
  polygon.actionManager.registerAction(
    new BABYLON.CombineAction(BABYLON.ActionManager.OnPickTrigger, [
      lightDiffuseAction(),
      zoomInAction(polygon),
      new BABYLON.ExecuteCodeAction(
        {
          trigger: BABYLON.ActionManager.NothingTrigger,
        },
        () => {
          setTimeout(() => {
            if (sharedBabylonObject.current) {
              sharedBabylonObject.current.scene = !sharedBabylonObject.current
                .scene
                ? 1
                : 0;
            }
          }, 1500);
        }
      ),
    ])
  );

  const someMesh = scene.getMeshByName(`hex_${2}_${0}`);
  console.log(someMesh);
  if (someMesh) {
    someMesh.isPickable = true;
    someMesh.actionManager = new BABYLON.ActionManager(scene);
    someMesh.actionManager.registerAction(
      new BABYLON.CombineAction(BABYLON.ActionManager.OnPickTrigger, [
        lightDiffuseAction(),
        zoomInAction(someMesh),
        new BABYLON.ExecuteCodeAction(
          {
            trigger: BABYLON.ActionManager.NothingTrigger,
          },
          () => {
            console.log('same mesh');
          }
        ),
      ])
    );
  }

  const particleSystem = BABYLON.ParticleHelper.CreateDefault(
    new BABYLON.Vector3(0, 0, 0)
  );
  particleSystem.emitter = polygon;
  particleSystem.start();

  return scene;
};

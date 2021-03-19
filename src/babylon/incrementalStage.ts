import * as BABYLON from '@babylonjs/core';
import { Scene } from '@babylonjs/core';
import { incrementals } from '../helpers/incrementals';
import { babylonTheme } from '../helpers/theme';
import { flipsUntilRing } from '../helpers/utils';
import { GameObjectRefType } from '../helpers/types';
import {
  buildGround,
  turnCentralAnimation,
  turnRingsAnimations,
} from './GroundHelper';
import {
  changeHexVisual,
  changeLatheVisual,
  createMaterials,
} from './incrementalStageColor';

const createScene = (sharedBabylonObject: any) => (scene: Scene) => {
  // This creates a basic Babylon Scene object (non-mesh)
  //   let scene = new BABYLON.Scene(engine);
  scene.clearColor = BABYLON.Color4.FromHexString(
    babylonTheme.colors.clearColor.incremental
  );
  scene.ambientColor = BABYLON.Color3.FromHexString(
    babylonTheme.colors.ambientColor.incremental
  );

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

  // camera.attachControl(null, true, true);

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

  createMaterials(scene);

  const [polygonPivot, polygonsObject] = buildGround(scene);

  [...Array(5)].map((_, index) => {
    const material = new BABYLON.StandardMaterial(`material_${index}`, scene);
    material.ambientColor = BABYLON.Color3.FromHexString(
      babylonTheme.colors.flip[index]
    );
    return material;
  });

  sharedBabylonObject.current.mainAction = (total: number) => {
    turnCentralAnimation(polygonPivot, `material_${total % 5}`, scene);

    const { flipsToExpand } = incrementals[
      sharedBabylonObject?.current?.selectedHex
    ];

    // TODO: take into account the max ring property

    turnRingsAnimations(total, polygonsObject, scene, flipsToExpand);

    if (total >= 1) {
      camera.radius = cameraRadiusValue(total, flipsToExpand);
    }
  };

  initialize(scene);
  sharedBabylonObject.current.sceneInitialization.incrementalScene = () => {
    initialize(scene);
  };

  return scene;
};

export const updateIncrementalState = (
  scene: Scene,
  total: number,
  sharedBabylonObject: { current?: GameObjectRefType }
) => {
  const centralMesh = scene.getMeshByName('polygon');

  if (!centralMesh) {
    return;
  }
  changeHexVisual(centralMesh, `material_${total % 5}`);

  // Generate rings of polygons
  [...Array(6)].forEach((_, ring) => {
    const numberOfTurns = ~~(total / flipsUntilRing(5, ring + 1));
    [...Array(6 * (ring + 1))].forEach((_, index) => {
      const mesh = scene.getMeshByName(`hex_${ring + 1}_${index}`);
      const lathe = scene.getMeshByName(`lathe_${ring + 1}_${index}`);

      if (mesh && lathe) {
        mesh.setEnabled(numberOfTurns !== 0);
        lathe.setEnabled(numberOfTurns !== 0);

        changeHexVisual(mesh, `material_${(numberOfTurns - 1) % 5}`);
      }
    });
  });

  // Update bonux hexes
  updateBonusHexes(scene, total);

  // Update camera distance
  if (total > 0) {
    const { flipsToExpand } = incrementals[
      sharedBabylonObject?.current?.selectedHex || ''
    ];
    (scene.getCameraByName(
      'camera'
    ) as BABYLON.ArcRotateCamera).radius = cameraRadiusValue(
      total,
      flipsToExpand
    );
  } else {
    (scene.getCameraByName('camera') as BABYLON.ArcRotateCamera).radius = 15;
  }
};

const updateBonusHexes = (scene: Scene, total: number) => {
  // TODO: not using total?

  // Update bonus
  (incrementals['hex_0_0'].bonusModels || []).forEach(
    ([ring, index, type]: [number, number, string]) => {
      const lathe = scene.getMeshByName(`lathe_${ring}_${index}`);
      if (lathe) {
        changeLatheVisual(lathe, `material_${type}`);
      }
    }
  );

  const breakFreeRing = incrementals['hex_0_0'].breakFree;
  if (breakFreeRing) {
    [...Array(breakFreeRing * 6)].forEach((_, index) => {
      const lathe = scene.getMeshByName(`lathe_${breakFreeRing}_${index}`);
      if (lathe) {
        changeLatheVisual(lathe, `material_break_free`);
      }
    });
  }
};

const cameraRadiusValue = (total: number, flipsToExpand: number) =>
  15 + ~~(Math.log(total) / Math.log(flipsToExpand)) * 15;

const initialize = (scene: Scene) => {
  // Hide every hex
  [...Array(6)].forEach((_, ring) =>
    [...Array(6 * (ring + 1))].forEach((_, index) => {
      const tmpMesh = scene.getMeshByName(`hex_${ring + 1}_${index}`);
      if (tmpMesh) {
        tmpMesh.setEnabled(false);
      }
      const tmpLathe = scene.getMeshByName(`lathe_${ring + 1}_${index}`);
      if (tmpLathe) {
        tmpLathe.setEnabled(false);
      }
    })
  );

  // Reset camera
  const camera = scene.getCameraByName('camera') as BABYLON.ArcRotateCamera;
  if (camera) {
    camera.radius = 15;
  }
};

export default createScene;

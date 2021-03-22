import { Scene } from '@babylonjs/core';
import {
  createCenterPolygon,
  createLatheHex,
  createRingPolygon,
} from './GroundHex';
import * as BABYLON from '@babylonjs/core';
import { xRotation, ySlide } from './Animation';
import { flipsUntilRing } from '../helpers/utils';
import { changeHexVisual, changeLatheVisual } from './incrementalStageColor';

export const buildGround = (
  scene: Scene
): [BABYLON.TransformNode, BABYLON.TransformNode[][]] => {
  // Create central polygon
  let originalPolygon = createCenterPolygon(scene, 'original_hex');
  originalPolygon.registerInstancedBuffer('color', 4);
  changeHexVisual(originalPolygon, 'central_hex');

  // Create a instance of the original, or it won't have color
  let polygon = originalPolygon.createInstance(`hex_0_0`);

  const lathe = createLatheHex('lathe_0_0', scene);
  lathe.registerInstancedBuffer('color', 4);
  changeLatheVisual(lathe, 'default');

  // Generate rings of polygons
  const polygonsObject = [...Array(6)].map((_, index) =>
    [...Array(6 * (index + 1))].map(
      createRingPolygon(originalPolygon, lathe, index + 1, {
        hideHexes: true,
        hideLathes: true,
        usePivot: true,
      })
    )
  );

  // central polygon pivot
  let polygonPivot = new BABYLON.TransformNode('root');
  polygonPivot.position = new BABYLON.Vector3(0, 0.5, 0);
  polygon.parent = polygonPivot;
  polygonPivot.animations.push(...[xRotation, ySlide]);

  originalPolygon.setEnabled(false);

  return [polygonPivot, polygonsObject];
};

export const turnCentralAnimation = (
  polygonPivot: BABYLON.TransformNode,
  material: number,
  scene: Scene
) => {
  scene.beginAnimation(polygonPivot, 0, 10, true);
  changeHexVisual(polygonPivot.getChildMeshes()[0], material);
};

export const turnRingAnimation = (
  polygonsObject: BABYLON.TransformNode[][],
  index: number,
  material: number,
  scene: Scene
) => {
  const meshArray = polygonsObject[index];
  meshArray.forEach((mesh, innerIndex) => {
    changeHexVisual(mesh.getChildMeshes()[0], material);
    mesh.getChildMeshes()[0].setEnabled(true);

    scene.getMeshByName(`lathe_${index + 1}_${innerIndex}`)?.setEnabled(true);
    scene.beginAnimation(mesh, 0, 10, true);
  });
};

export const turnRingsAnimations = (
  total: number,
  polygonsObject: BABYLON.TransformNode[][],
  scene: Scene,
  flipsToExpand: number
) => {
  polygonsObject.forEach((_, ring) => {
    if (total > 0 && total % flipsUntilRing(flipsToExpand, ring + 1) === 0) {
      const numberOfTurns = ~~(total / flipsUntilRing(flipsToExpand, ring + 1));
      turnRingAnimation(polygonsObject, ring, numberOfTurns, scene);
    }
  });
};

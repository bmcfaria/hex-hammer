import { Scene } from '@babylonjs/core';
import {
  createCenterPolygon,
  createLatheHex,
  createRingPolygon,
} from './GroundHex';
import * as BABYLON from '@babylonjs/core';
import { xRotation, ySlide } from './Animation';
import { babylonTheme } from '../helpers/theme';
import { flipsUntilRing } from '../helpers/utils';

export const buildGround = (
  scene: Scene
): [BABYLON.TransformNode, BABYLON.TransformNode[][]] => {
  // Create central polygon
  let polygon = createCenterPolygon(scene);
  createLatheHex('lathe_central', scene);

  // Generate rings of polygons
  const polygonsObject = [...Array(6)].map((_, index) =>
    [...Array(6 * (index + 1))].map(
      createRingPolygon(polygon, index + 1, {
        hideHexes: true,
        hideLathes: true,
      })
    )
  );

  // central polygon pivot
  let polygonPivot = new BABYLON.TransformNode('root');
  polygonPivot.position = new BABYLON.Vector3(0, 0.5, 0);
  polygon.parent = polygonPivot;
  polygonPivot.animations.push(...[xRotation, ySlide]);

  let centralHexColor = new BABYLON.StandardMaterial('centralHex', scene);
  centralHexColor.ambientColor = BABYLON.Color3.FromHexString(
    babylonTheme.colors.map.central
  );
  polygon.material = centralHexColor;

  return [polygonPivot, polygonsObject];
};

export const turnCentralAnimation = (
  polygonPivot: BABYLON.TransformNode,
  material: BABYLON.Nullable<BABYLON.Material>,
  scene: Scene
) => {
  scene.beginAnimation(polygonPivot, 0, 10, true);
  polygonPivot.getChildMeshes()[0].material = material;
};

export const turnRingAnimation = (
  polygonsObject: BABYLON.TransformNode[][],
  index: number,
  material: BABYLON.Nullable<BABYLON.Material>,
  scene: Scene
) => {
  const meshArray = polygonsObject[index];
  meshArray.forEach((mesh, innerIndex) => {
    mesh.getChildMeshes()[0].material = material;
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
      turnRingAnimation(
        polygonsObject,
        ring,
        scene.getMaterialByName(`material_${(numberOfTurns - 1) % 5}`),
        scene
      );
    }
  });
};

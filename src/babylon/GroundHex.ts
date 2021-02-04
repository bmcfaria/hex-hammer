import * as BABYLON from '@babylonjs/core';
import { Mesh, Scene } from '@babylonjs/core';
import { xRotation, ySlide } from './Animation';

const margin = 0.1;
const radius = 2;
const polygonOrientation = 1; // 0 - flat || 1 - pointy

const hexCoordinates = (ring: number, index: number) => {
  let polygonFlatWidth = 2 * radius;
  let polygonPointyWidth = Math.sqrt(3) * radius;

  let polygonWidth = polygonOrientation ? polygonPointyWidth : polygonFlatWidth;
  let polygonHeight = polygonOrientation
    ? polygonFlatWidth
    : polygonPointyWidth;

  let row = 9;
  if (index <= ring) {
    row = -index;
  } else if (index <= 2 * ring) {
    row = -ring;
  } else if (index <= 4 * ring) {
    row = index - 3 * ring;
  } else if (index <= 5 * ring) {
    row = ring;
  } else {
    row = 6 * ring - index;
  }

  let vLeft = 9;
  if (index <= ring) {
    vLeft = ring;
  } else if (index <= 3 * ring) {
    vLeft = 2 * ring - index;
  } else if (index <= 4 * ring) {
    vLeft = 2 * ring - 3 * ring;
  } else {
    vLeft = -5 * ring + index;
  }

  return new BABYLON.Vector3(
    vLeft * (polygonWidth + margin) + (row * (polygonWidth + margin)) / 2,
    0.5,
    -row * ((polygonHeight * 3) / 4 + margin)
  );
};

export const createLatheHex = (name: string, scene: Scene) => {
  // 0.02 or else it will have margin between lathes
  const myShape = [
    new BABYLON.Vector3(radius, 0, 0),
    new BABYLON.Vector3(radius + margin / 2 + 0.01, 0, 0),
    new BABYLON.Vector3(radius + margin / 2 + 0.01, 1, 0),
    new BABYLON.Vector3(radius, 1, 0),
  ];

  //Create lathe
  const lathe = BABYLON.MeshBuilder.CreateLathe(
    name,
    {
      shape: myShape,
      radius: 1,
      tessellation: 6,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    },
    scene
  );
  lathe.rotation.y = Math.PI / 2;
  lathe.convertToFlatShadedMesh();

  return lathe;
};

export const createRingPolygon = (
  polygon: Mesh,
  ring = 1,
  {
    meshMaterial,
    latheMaterial,
    hideHexes,
    hideLathes,
  }: {
    meshMaterial?: BABYLON.StandardMaterial;
    latheMaterial?: BABYLON.StandardMaterial;
    hideHexes?: boolean;
    hideLathes?: boolean;
  } = {}
) => (_: any, index: number) => {
  let tmpPolygon = polygon.clone();
  tmpPolygon.name = `hex_${ring}_${index}`;
  tmpPolygon.isPickable = false;

  let CoR_At = hexCoordinates(ring, index);
  let pivot = new BABYLON.TransformNode(`root_${ring}_${index}`);
  pivot.position = CoR_At;

  let pivotRotation = 0;
  pivotRotation = CoR_At.x > 0 ? Math.PI / 2 : pivotRotation;
  pivotRotation = CoR_At.x < 0 ? -Math.PI / 2 : pivotRotation;
  pivotRotation = CoR_At.x === 0 && CoR_At.z < 0 ? Math.PI : pivotRotation;
  pivotRotation =
    CoR_At.x > 0 && CoR_At.z < 0 ? (5 * Math.PI) / 6 : pivotRotation;
  pivotRotation = CoR_At.x > 0 && CoR_At.z > 0 ? Math.PI / 6 : pivotRotation;
  pivotRotation =
    CoR_At.x < 0 && CoR_At.z < 0 ? (7 * Math.PI) / 6 : pivotRotation;
  pivotRotation = CoR_At.x < 0 && CoR_At.z > 0 ? -Math.PI / 6 : pivotRotation;

  pivot.rotation.y = pivotRotation;

  tmpPolygon.parent = pivot;
  tmpPolygon.position.x = 0;
  tmpPolygon.position.y = 0.5;
  tmpPolygon.position.z = 0;

  tmpPolygon.rotation.y = Math.PI / 2 - pivot.rotation.y;
  if (hideHexes) {
    tmpPolygon.setEnabled(false);
  }

  if (meshMaterial) {
    tmpPolygon.material = meshMaterial;
  }

  pivot.animations.push(...[xRotation, ySlide]);

  const lathe = createLatheHex(`lathe_${ring}_${index}`, polygon.getScene());
  lathe.position = CoR_At.clone();
  lathe.position.y = 0;

  if (hideLathes) {
    lathe.setEnabled(false);
  }

  if (latheMaterial) {
    lathe.material = latheMaterial;
  }

  // if (ring === outterRing) {
  //   const material = new BABYLON.StandardMaterial(
  //     `material_${index}`,
  //     polygon.getScene()
  //   );
  //   material.ambientColor = new BABYLON.Color3(1, 0, 0);
  //   lathe.material = material;
  // }

  return pivot;
};

export const createCenterPolygon = (scene: Scene) => {
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
  polygon.position.y = 0.5;
  polygon.rotation.y = polygonOrientation ? Math.PI / 2 : 0;

  createLatheHex('lathe_central', scene);

  return polygon;
};

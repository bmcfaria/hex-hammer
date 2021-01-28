import * as BABYLON from '@babylonjs/core';
import { Mesh, Scene } from '@babylonjs/core';
import { xRotation, ySlide } from './Animation';

const margin = 0.1;
const radius = 2;
const polygonOrientation = 1; // 0 - flat || 1 - pointy

export const createRingPolygon = (polygon: Mesh, ring = 1) => (
  _: any,
  index: number
) => {
  let polygonFlatWidth = 2 * radius;
  let polygonPointyWidth = Math.sqrt(3) * radius;

  let polygonWidth = polygonOrientation ? polygonPointyWidth : polygonFlatWidth;
  let polygonHeight = polygonOrientation
    ? polygonFlatWidth
    : polygonPointyWidth;

  let tmpPolygon = polygon.clone();
  tmpPolygon.isPickable = false;

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

  let CoR_At = new BABYLON.Vector3(
    vLeft * (polygonWidth + margin) + (row * (polygonWidth + margin)) / 2,
    0.5,
    -row * ((polygonHeight * 3) / 4 + margin)
  );
  let pivot = new BABYLON.TransformNode('root');
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
  tmpPolygon.setEnabled(false);

  pivot.animations.push(...[xRotation, ySlide]);

  const myShape = [
    new BABYLON.Vector3(2, 0, 0),
    new BABYLON.Vector3(2.1, 0, 0),
    new BABYLON.Vector3(2.1, 1, 0),
    new BABYLON.Vector3(2, 1, 0),
  ];

  //Create lathe
  const lathe = BABYLON.MeshBuilder.CreateLathe(`lathe_${ring}_${index}`, {
    shape: myShape,
    radius: 1,
    tessellation: 6,
    sideOrientation: BABYLON.Mesh.DOUBLESIDE,
  });
  lathe.rotation.y = Math.PI / 2;
  lathe.convertToFlatShadedMesh();
  lathe.position = CoR_At.clone();
  lathe.position.y = 0;
  lathe.setEnabled(false);

  if (ring === 2) {
    const material = new BABYLON.StandardMaterial(
      `material_${index}`,
      polygon.getScene()
    );
    material.ambientColor = new BABYLON.Color3(1, 0, 0);
    lathe.material = material;
  }

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

  const myShape = [
    new BABYLON.Vector3(2, 0, 0),
    new BABYLON.Vector3(2.1, 0, 0),
    new BABYLON.Vector3(2.1, 1, 0),
    new BABYLON.Vector3(2, 1, 0),
  ];

  //Create lathe
  const lathe = BABYLON.MeshBuilder.CreateLathe('lathe', {
    shape: myShape,
    radius: 1,
    tessellation: 6,
    sideOrientation: BABYLON.Mesh.DEFAULTSIDE,
  });
  lathe.rotation.y = Math.PI / 2;
  lathe.convertToFlatShadedMesh();

  return polygon;
};

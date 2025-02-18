import * as BABYLON from '@babylonjs/core';
import { Mesh, Nullable, Scene } from '@babylonjs/core';
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

export const createLatheHex = (
  name: string,
  scene: Scene,
  bottom?: boolean,
  height = 1
) => {
  let myShape;
  if (bottom) {
    myShape = [new BABYLON.Vector3(radius, 0, 0), new BABYLON.Vector3(0, 0, 0)];
  } else {
    myShape = [
      new BABYLON.Vector3(radius, 0, 0),
      new BABYLON.Vector3(radius + margin / 2, 0, 0),
      new BABYLON.Vector3(radius + margin / 2, height, 0),
      new BABYLON.Vector3(radius, height, 0),
      new BABYLON.Vector3(radius, 0, 0),
    ];
  }

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
  originalLathe: Mesh,
  ring = 1,
  {
    meshMaterial,
    latheMaterial,
    hideHexes,
    hideLathes,
    drawBottom,
    bottomMaterial,
    usePivot,
    namePrefix = '',
  }: {
    meshMaterial?: Nullable<BABYLON.Material>;
    latheMaterial?: Nullable<BABYLON.Material>;
    hideHexes?: boolean;
    hideLathes?: boolean;
    drawBottom?: boolean;
    bottomMaterial?: Nullable<BABYLON.Material>;
    usePivot?: boolean;
    namePrefix?: string;
  } = {}
) => (_: any, index: number) => {
  let tmpPolygon = polygon.createInstance(`${namePrefix}hex_${ring}_${index}`);
  tmpPolygon.isPickable = false;

  let CoR_At = hexCoordinates(ring, index);
  let returnObject;

  if (usePivot) {
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
    pivot.animations.push(...[xRotation, ySlide]);

    tmpPolygon.position.x = 0;
    tmpPolygon.position.y = -0.5;
    tmpPolygon.position.z = 0;

    tmpPolygon.rotation.y = Math.PI / 2 - pivot.rotation.y;

    returnObject = pivot;
  } else {
    tmpPolygon.position = CoR_At;
    tmpPolygon.position.y = 0;
    returnObject = tmpPolygon;
  }

  if (hideHexes) {
    tmpPolygon.setEnabled(false);
  }

  // if (meshMaterial) {
  //   tmpPolygon.material = meshMaterial;
  // }

  const lathe = originalLathe.createInstance(
    `${namePrefix}lathe_${ring}_${index}`
  );
  lathe.position = CoR_At.clone();
  lathe.position.y = 0;

  if (hideLathes) {
    lathe.setEnabled(false);
  }

  // if (latheMaterial) {
  //   lathe.material = latheMaterial;
  // }

  if (drawBottom) {
    const latheBottom = createLatheHex(
      `hex_${ring}_${index}_bottom`,
      polygon.getScene(),
      true
    );
    latheBottom.position = CoR_At.clone();
    latheBottom.position.y = 0;
    if (bottomMaterial) {
      latheBottom.material = bottomMaterial;
    }
  }

  return returnObject;
};

export const createCenterPolygon = (
  scene: Scene,
  name: string = 'polygon',
  top = false,
  height = 1
) => {
  let myShape;

  if (top) {
    myShape = [
      new BABYLON.Vector3(radius, height, 0),
      new BABYLON.Vector3(0, height, 0),
    ];
  } else {
    myShape = [
      new BABYLON.Vector3(0, 0, 0),
      new BABYLON.Vector3(radius, 0, 0),
      new BABYLON.Vector3(radius, height, 0),
      new BABYLON.Vector3(0, height, 0),
    ];
  }

  const polygon = BABYLON.MeshBuilder.CreateLathe(
    name,
    {
      shape: myShape,
      radius: 1,
      tessellation: 6,
      sideOrientation: BABYLON.Mesh.DOUBLESIDE,
    },
    scene
  );
  polygon.position.y = -0.5;
  polygon.rotation.y = Math.PI / 2;
  polygon.convertToFlatShadedMesh();

  return polygon;
};

export const createTextMesh = (scene: Scene, name: string) => {
  //Set width an height for plane
  var planeWidth = radius * 1.5;
  var planeHeight = radius * 1.5;

  const plane = BABYLON.MeshBuilder.CreateGround(
    name,
    {
      width: planeWidth,
      height: planeHeight,
    },
    scene
  );
  plane.isPickable = false;
  plane.position.y = 1.01;

  let planeMaterial = new BABYLON.StandardMaterial(name, scene);
  plane.material = planeMaterial;
  // planeMaterial.alpha = 0.5;
  (plane.material as any).specularColor = new BABYLON.Color3(0, 0, 0);

  //Set width and height for dynamic texture using same multiplier
  const multiplier = 4;
  var DTWidth = 50 * multiplier;
  var DTHeight = 50 * multiplier;

  //Create dynamic texture
  var dynamicTexture = new BABYLON.DynamicTexture(
    'DynamicTexture',
    { width: DTWidth, height: DTHeight },
    scene,
    false
  );
  dynamicTexture.hasAlpha = true;

  planeMaterial.diffuseTexture = dynamicTexture;

  return plane;
};

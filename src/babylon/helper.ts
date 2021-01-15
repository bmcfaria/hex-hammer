import * as BABYLON from '@babylonjs/core';
import { Mesh, Scene } from '@babylonjs/core';

// https://playground.babylonjs.com/#WPUT6K#38

const rotationAnimation = (property: string) => {
  const frameRate = 20;
  const xSlide = new BABYLON.Animation(
    'xSlide',
    property,
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  const keyFrames = [
    { frame: 0, value: 0 },
    { frame: 2, value: Math.PI / 2 },
    { frame: 5, value: Math.PI },
  ];
  xSlide.setKeys(keyFrames);

  return xSlide;
};

const translationAnimation = (property: string) => {
  const frameRate = 20;
  const animation = new BABYLON.Animation(
    'translationAnimation',
    property,
    frameRate,
    BABYLON.Animation.ANIMATIONTYPE_FLOAT,
    BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
  );

  const keyFrames = [
    { frame: 0, value: 0.5 },
    { frame: 1, value: 4 },
    { frame: 5, value: 0.5 },
  ];
  animation.setKeys(keyFrames);
  return animation;
};
// var makeTextPlane = function (text: string, color: string, size: number) {
//   var dynamicTexture = new BABYLON.DynamicTexture(
//     'DynamicTexture',
//     50,
//     null,
//     true
//   );
//   dynamicTexture.hasAlpha = true;
//   dynamicTexture.drawText(
//     text,
//     0,
//     40,
//     'bold 36px Arial',
//     color,
//     'transparent',
//     true
//   );
//   var plane = new BABYLON.Mesh.CreatePlane('TextPlane', size, null, true);
//   plane.material = new BABYLON.StandardMaterial('TextPlaneMaterial', null);
//   plane.material.backFaceCulling = false;
//   plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
//   plane.material.diffuseTexture = dynamicTexture;
//   return plane;
// };
// const writeCoordinates = (leftText, bottomText, rightText, polygon) => {
//   var left = makeTextPlane(leftText, 'blue', 1);
//   left.rotation.y = -Math.PI / 2;
//   left.rotation.x = Math.PI / 2;
//   left.position = new BABYLON.Vector3(-0.5, 0.1, -1);
//   left.parent = polygon;

//   var bottom = makeTextPlane(bottomText, 'blue', 1);
//   bottom.rotation.y = -Math.PI / 2;
//   bottom.rotation.x = Math.PI / 2;
//   bottom.position = new BABYLON.Vector3(1, 0.1, 0.3);
//   bottom.parent = polygon;

//   var right = makeTextPlane(rightText, 'blue', 1);
//   right.rotation.y = -Math.PI / 2;
//   right.rotation.x = Math.PI / 2;
//   right.position = new BABYLON.Vector3(-0.5, 0.1, 1.3);
//   right.parent = polygon;
// };

const margin = 0.1;
const xRotation = rotationAnimation('rotation.x');
const ySlide = translationAnimation('position.y');
const createPolygon = (
  polygon: Mesh,
  poligonWidth: number,
  poligonHeight: number,
  ring = 1
) => (_: any, index: number) => {
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
  let vRight = -vLeft - row;

  let CoR_At = new BABYLON.Vector3(
    vLeft * (poligonWidth + margin) + (row * (poligonWidth + margin)) / 2,
    0.5,
    -row * ((poligonHeight * 3) / 4 + margin)
  );
  var pivot = new BABYLON.TransformNode('root');
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
  tmpPolygon.position.y -= 0.5;
  tmpPolygon.position.z = 0;

  tmpPolygon.rotation.y = Math.PI / 2 - pivot.rotation.y;

  const showCubicCoordenates = false;
  if (showCubicCoordenates) {
    let rowText = row > 0 ? `+${row}` : row;
    let vLeftText = vLeft > 0 ? `+${vLeft}` : vLeft;
    let vRightText = vRight > 0 ? `+${vRight}` : vRight;

    // writeCoordinates(vLeftText, vRightText, rowText, tmpPolygon);
  }

  pivot.animations.push(...[xRotation, ySlide]);

  return pivot;
};

const createScene = (sharedBabylonObject: any) => (scene: Scene) => {
  // This creates a basic Babylon Scene object (non-mesh)
  //   var scene = new BABYLON.Scene(engine);
  scene.ambientColor = new BABYLON.Color3(1, 1, 1);

  // This creates and positions a free camera (non-mesh)
  //var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 50, 0), scene);
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
  // const canvas = scene.getEngine().getRenderingCanvas();
  // camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  var light = new BABYLON.HemisphericLight(
    'light',
    new BABYLON.Vector3(0, 1, 0),
    scene
  );
  // light.diffuse = new BABYLON.Color3(1, 0, 0);
  // light.specular = new BABYLON.Color3(0, 1, 0);
  // light.groundColor = new BABYLON.Color3(0, 1, 0);

  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  var radius = 2;
  var shape = [];
  for (var i = 0; i < 6; i++) {
    shape.push(
      new BABYLON.Vector3(
        radius * Math.cos((i * Math.PI) / 3),
        0,
        radius * Math.sin((i * Math.PI) / 3)
      )
    );
  }

  var poligonFlatWidth = 2 * radius;
  var poligonPointyWidth = Math.sqrt(3) * radius;

  var poligonOrientation = 1; // 0 - flat || 1 - pointy
  var poligonWidth = poligonOrientation ? poligonPointyWidth : poligonFlatWidth;
  var poligonHeight = poligonOrientation
    ? poligonFlatWidth
    : poligonPointyWidth;

  var polygon = BABYLON.MeshBuilder.ExtrudePolygon(
    'polygon',
    { shape: shape, depth: 1, sideOrientation: BABYLON.Mesh.DOUBLESIDE },
    scene
  );
  polygon.position.y = 1;
  polygon.rotation.y = poligonOrientation ? Math.PI / 2 : 0;

  const polygonsObject = [...Array(15)].map((_, index) =>
    [...Array(6 * (index + 1))].map(
      createPolygon(polygon, poligonWidth, poligonHeight, index + 1)
    )
  );

  var centralHexColor = new BABYLON.StandardMaterial('centralHex', scene);
  centralHexColor.ambientColor = new BABYLON.Color3(1, 0, 0);
  polygon.material = centralHexColor;

  const materials = [...Array(5)].map((_, index) => {
    const material = new BABYLON.StandardMaterial(`material_${index}`, scene);
    material.ambientColor = new BABYLON.Color3(
      Math.random(),
      Math.random(),
      Math.random()
    );
    return material;
  });

  const turnRowAnimation = (
    index: number,
    material: BABYLON.StandardMaterial
  ) => {
    const meshArray = polygonsObject[index];
    meshArray.forEach(mesh => {
      mesh.getChildMeshes()[0].material = material;
      scene.beginAnimation(mesh, 0, 10, true);
    });
  };

  let activeRow = 0;
  let rowCounters = Array(polygonsObject.length).fill(0);

  sharedBabylonObject.mainAction = () => {
    turnRowAnimation(
      activeRow,
      materials[rowCounters[activeRow] % materials.length]
    );
    rowCounters[activeRow]++;
    if (rowCounters[activeRow] > materials.length) {
      turnRowAnimation(
        activeRow + 1,
        materials[rowCounters[activeRow + 1] % materials.length]
      );
      rowCounters[activeRow + 1]++;

      // Reset parent
      rowCounters[activeRow] = 1;
      camera.radius += 10;
    }
  };

  return scene;
};

export default createScene;

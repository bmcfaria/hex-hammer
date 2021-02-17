import * as BABYLON from '@babylonjs/core';
import { Scene, Vector3 } from '@babylonjs/core';
import { AdvancedDynamicTexture, TextBlock } from '@babylonjs/gui';
import { modalHex } from '../helpers/values';
import {
  createRingPolygon,
  createLatheHex,
  createCenterPolygon,
} from './GroundHex';

const modalMaterialMapping = {
  incremental: 'material_incremental',
  expand: 'material_expand',
  trade: 'material_trade',
};

const cornerNames = [
  'hex_5_0',
  'hex_5_5',
  'hex_5_10',
  'hex_5_15',
  'hex_5_20',
  'hex_5_25',
];
const cornersAndUnlockHex = [
  ['hex_5_0', 'hex_4_0'],
  ['hex_5_5', 'hex_4_4'],
  ['hex_5_10', 'hex_4_8'],
  ['hex_5_15', 'hex_4_12'],
  ['hex_5_20', 'hex_4_16'],
  ['hex_5_25', 'hex_4_20'],
];

export const createSceneSecondStage = (sharedBabylonObject: any) => (
  scene: Scene
) => {
  scene.clearColor = BABYLON.Color4.FromHexString('#3a5a40ff');
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
  // light.groundColor = new BABYLON.Color3(0, 1, 0);

  // Generates / color
  createMaterials(scene);

  const polygonOrientation = 1; // 0 - flat || 1 - pointy

  let polygon = createCenterPolygon(scene, 'hex_0_0');
  polygon.position.y = 1;
  polygon.rotation.y = polygonOrientation ? Math.PI / 2 : 0;

  polygon.material = scene.getMaterialByName('material_central');

  const lathe = createLatheHex('lathe_0_0', scene);
  lathe.material = scene.getMaterialByName('material_lathe');

  [...Array(5)].map((_, index) =>
    [...Array(6 * (index + 1))].map(
      createRingPolygon(polygon, index + 1, {
        meshMaterial: scene.getMaterialByName('material_common_hex'),
        latheMaterial: scene.getMaterialByName('material_border_hex'),
        hideHexes: true,
      })
    )
  );

  // Initialize colors for the last ring
  [...Array(6 * 5)].forEach((_, index) => {
    (
      scene.getMeshByName(`hex_${5}_${index}`) || { material: null }
    ).material = scene.getMaterialByName('material_lathe');
    scene.getMeshByName(`hex_${5}_${index}`)?.setEnabled(true);
  });

  // Lathe/Hex colors for the corners and trigger
  [0, 5, 10, 15, 20, 25].forEach(index => {
    const cornerLathe = scene.getMeshByName(`lathe_${5}_${index}`);

    if (cornerLathe) {
      cornerLathe.material = scene.getMaterialByName('material_central');
    }

    const cornerHex = scene.getMeshByName(`hex_${5}_${index}`);
    if (cornerHex) {
      cornerHex.isPickable = false;
      cornerHex.setEnabled(false);

      cornerHex.actionManager = new BABYLON.ActionManager(scene);
      cornerHex.actionManager.registerAction(
        new BABYLON.CombineAction(BABYLON.ActionManager.OnPickTrigger, [
          new BABYLON.ExecuteCodeAction(
            {
              trigger: BABYLON.ActionManager.NothingTrigger,
            },
            () => {
              sharedBabylonObject.current.changeScene(
                'incremental',
                `hex_${5}_${index}`
              );
            }
          ),
        ])
      );
    }
  });

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
          polygon.isPickable = false;

          setTimeout(() => {
            sharedBabylonObject.current?.changeScene('incremental');
          }, 1500);
        }
      ),
    ])
  );

  Object.keys(modalHex).forEach(modalKey => {
    const tmpMesh = scene.getMeshByName(modalKey);

    if (tmpMesh) {
      tmpMesh.isPickable = true;

      tmpMesh.actionManager = new BABYLON.ActionManager(scene);
      tmpMesh.actionManager.registerAction(
        new BABYLON.CombineAction(BABYLON.ActionManager.OnPickTrigger, [
          new BABYLON.ExecuteCodeAction(
            {
              trigger: BABYLON.ActionManager.NothingTrigger,
            },
            () => {
              sharedBabylonObject.current?.ui.openModal(tmpMesh.name);
            }
          ),
        ])
      );
    }
  });

  const particleSystem = BABYLON.ParticleHelper.CreateDefault(
    new BABYLON.Vector3(0, 0, 0)
  );
  particleSystem.emitter = polygon;
  particleSystem.start();

  // Mark special lathes
  Object.entries(modalHex).forEach(([modalKey, modalValue]) => {
    const values = modalKey.split('_');
    const currentRing = ~~values[1];
    const currentIndex = ~~values[2];
    const type = modalValue.type as keyof typeof modalMaterialMapping;

    (
      scene.getMeshByName(modalKey) || { material: null }
    ).material = scene.getMaterialByName(modalMaterialMapping[type]);

    const latheName = `lathe_${currentRing}_${currentIndex}`;
    (
      scene.getMeshByName(latheName) || { material: null }
    ).material = scene.getMaterialByName(modalMaterialMapping[type]);
  });

  var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
  const textBlocksObject = ['hex_0_0', ...cornerNames].reduce(
    (results, name: string) => ({
      ...results,
      [name]: createValuePerSecondText(
        name,
        advancedTexture,
        scene.getMeshByName(name)
      ),
    }),
    {}
  );

  sharedBabylonObject.current.inc.update = updateValuePerSecondTexts(
    textBlocksObject
  );

  sharedBabylonObject.current.ui.zoomIn = () => {
    camera.radius -= 15;
  };

  sharedBabylonObject.current.ui.zoomOut = () => {
    camera.radius += 15;
  };

  // var ground = BABYLON.MeshBuilder.CreateGround(
  //   'ground',
  //   { width: 40, height: 40 },
  //   scene
  // );
  // new BABYLON.StandardMaterial(
  //   'material_ground',
  //   scene
  // ).ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
  // ground.material = scene.getMaterialByName('material_ground');

  return scene;
};

export const onRenderSecondStage = (scene: Scene, sharedBabylonObject: any) => {
  Object.keys(sharedBabylonObject?.current.modalHexValues || {}).forEach(
    hexName => {
      scene.getMeshByName(hexName)?.setEnabled(true);
    }
  );

  // Unlock corners if valid
  cornersAndUnlockHex.forEach(([corner, unlockHex]) => {
    if ((sharedBabylonObject?.current.modalHexValues || {})[unlockHex]) {
      const cornerMesh = scene.getMeshByName(corner);
      if (cornerMesh) {
        cornerMesh.material = scene.getMaterialByName(
          modalMaterialMapping['incremental']
        );
        cornerMesh.isPickable = true;
        cornerMesh.setEnabled(true);
      }
    }
  });
};

const createMaterials = (scene: Scene) => {
  new BABYLON.StandardMaterial(
    'material_central',
    scene
  ).ambientColor = new BABYLON.Color3(1, 0, 0);

  new BABYLON.StandardMaterial(
    'material_lathe',
    scene
  ).ambientColor = new BABYLON.Color3(0, 0, 0);

  new BABYLON.StandardMaterial(
    'material_common_hex',
    scene
  ).ambientColor = new BABYLON.Color3(1, 1, 1);

  new BABYLON.StandardMaterial(
    'material_border_hex',
    scene
  ).ambientColor = new BABYLON.Color3(0, 0, 0);

  // Materials
  new BABYLON.StandardMaterial(
    'material_incremental',
    scene
  ).ambientColor = new BABYLON.Color3(1, 0, 0);

  new BABYLON.StandardMaterial(
    'material_trade',
    scene
  ).ambientColor = new BABYLON.Color3(0, 1, 0);

  new BABYLON.StandardMaterial(
    'material_expand',
    scene
  ).ambientColor = new BABYLON.Color3(0, 0, 1);
};

const createValuePerSecondText = (
  name: string,
  advancedTexture: AdvancedDynamicTexture,
  mesh: BABYLON.Nullable<BABYLON.AbstractMesh>
) => {
  var textBlock = new TextBlock(name);
  textBlock.fontSize = 24;
  textBlock.top = -100;
  textBlock.color = 'black';
  advancedTexture.addControl(textBlock);
  textBlock.linkWithMesh(mesh);

  return textBlock;
};

const updateValuePerSecondTexts = (textBlocksObject: any) => (
  name: string,
  value: number
) => {
  const textBlock = textBlocksObject[name];
  if (textBlock) {
    textBlock.text = `${~~value}/s`;
  }
};

// It gave me a little motion sickness 🤮
// const applyAnimationsForSideHexes = (
//   scene: Scene,
//   camera: BABYLON.ArcRotateCamera
// ) => {
//   Object.keys(modalHex).forEach(modalKey => {
//     const tmpMesh = scene.getMeshByName(modalKey);

//     if (tmpMesh) {
//       tmpMesh.isPickable = true;

//       tmpMesh.actionManager = new BABYLON.ActionManager(scene);
//       tmpMesh.actionManager.registerAction(
//         new BABYLON.CombineAction(BABYLON.ActionManager.OnPickTrigger, [
//           // lightDiffuseAction(),
//           // zoomInAction(tmpMesh),
//           new BABYLON.InterpolateValueAction(
//             BABYLON.ActionManager.NothingTrigger,
//             camera,
//             'position',
//             new Vector3(
//               (tmpMesh.parent as any).position.x,
//               camera.position.y,
//               camera.position.z
//             ),
//             10000
//           ),
//           new BABYLON.InterpolateValueAction(
//             BABYLON.ActionManager.NothingTrigger,
//             camera,
//             'target',
//             (tmpMesh.parent as any).position.clone(),
//             500
//           ),
//           // new BABYLON.ExecuteCodeAction(
//           //   {
//           //     trigger: BABYLON.ActionManager.NothingTrigger,
//           //   },
//           //   () => {
//           //     console.log('same mesh');
//           //     if (tmpMesh.parent) {
//           //       console.log(
//           //         camera.position.x,
//           //         (tmpMesh.parent as any).position.x
//           //       );
//           //       camera.position = new Vector3(
//           //         (tmpMesh.parent as any).position.x,
//           //         camera.position.y,
//           //         camera.position.z
//           //       );

//           //       camera.target = (tmpMesh.parent as any).position.clone();
//           //     }
//           //   }
//           // ),
//         ])
//       );
//     }
//   });
// };

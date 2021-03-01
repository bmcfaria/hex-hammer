import * as BABYLON from '@babylonjs/core';
import { Scene } from '@babylonjs/core';
import { babylonTheme } from '../helpers/theme';
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
const incrementalHexes = ['hex_0_0', ...cornerNames];

const cornersAndUnlockHex = [
  ['hex_5_0', 'hex_4_0'],
  ['hex_5_5', 'hex_4_4'],
  ['hex_5_10', 'hex_4_8'],
  ['hex_5_15', 'hex_4_12'],
  ['hex_5_20', 'hex_4_16'],
  ['hex_5_25', 'hex_4_20'],
];

const font = 'bold 32px verdana';

export const createSceneSecondStage = (sharedBabylonObject: any) => (
  scene: Scene
) => {
  scene.clearColor = BABYLON.Color4.FromHexString(
    babylonTheme.colors.clearColor.secondStage
  );
  scene.ambientColor = BABYLON.Color3.FromHexString(
    babylonTheme.colors.ambientColor.secondStage
  );

  // Initialize camera
  const camera = initializeCamera(scene);

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

  // Create a parent node for all meshes
  const parentNode = new BABYLON.TransformNode('secondStageParent', scene);

  let polygon = createCenterPolygon(scene, 'hex_0_0');
  polygon.position.y = 1;
  polygon.rotation.y = polygonOrientation ? Math.PI / 2 : 0;
  polygon.setParent(parentNode);

  const lathe = createLatheHex('lathe_0_0', scene);
  lathe.setParent(parentNode);
  lathe.material = scene.getMaterialByName('material_lathe');

  // Disable parent
  parentNode.setEnabled(false);
  sharedBabylonObject.current.sceneDisable.secondStageScene = () => {
    parentNode.setEnabled(false);
  };

  [...Array(5)].map((_, ring) =>
    [...Array(6 * (ring + 1))].map((_, index) =>
      createRingPolygon(polygon, ring + 1, {
        meshMaterial: scene.getMaterialByName('material_common_hex'),
        latheMaterial: scene.getMaterialByName('material_border_hex'),
        hideHexes: true,
        // drawBottom:
        //   Object.keys(modalHex).includes(`hex_${ring + 1}_${index}`) ||
        //   cornerNames.includes(`hex_${ring + 1}_${index}`),
        bottomMaterial: scene.getMaterialByName('material_bottom'),
      })(_, index)
    )
  );

  initializeMeshes(scene, sharedBabylonObject);
  sharedBabylonObject.current.sceneInitialization.secondStageScene = () => {
    initializeMeshes(scene, sharedBabylonObject);
  };

  polygon.actionManager = new BABYLON.ActionManager(scene);
  polygon.actionManager.registerAction(
    new BABYLON.CombineAction(BABYLON.ActionManager.OnPickTrigger, [
      new BABYLON.ExecuteCodeAction(
        {
          trigger: BABYLON.ActionManager.NothingTrigger,
        },
        () => {
          sharedBabylonObject.current.ui.openIncremental('hex_0_0');
        }
      ),
    ])
  );

  const particleSystem = BABYLON.ParticleHelper.CreateDefault(
    new BABYLON.Vector3(0, 0, 0)
  );
  particleSystem.emitter = polygon;
  particleSystem.start();

  sharedBabylonObject.current.inc.update = updateValuePerSecondText(scene);
  sharedBabylonObject.current.inc.clearText = clearHexText(scene);

  sharedBabylonObject.current.ui.zoomIn = () => {
    // Zoom in limit
    if (camera.radius >= 30) {
      camera.radius -= 15;
    }
  };

  sharedBabylonObject.current.ui.zoomOut = () => {
    camera.radius += 15;
  };

  // Set the node parent in all meshes (except central that already has it)
  [...Array(5)].forEach((_, ring) =>
    [...Array(6 * (ring + 1))].forEach((_, index) => {
      const tmpMesh = scene.getMeshByName(`hex_${ring + 1}_${index}`);
      if (tmpMesh) {
        tmpMesh.setParent(parentNode);
      }
      const tmpLathe = scene.getMeshByName(`lathe_${ring + 1}_${index}`);
      if (tmpLathe) {
        tmpLathe.setParent(parentNode);
      }
    })
  );

  return scene;
};

const initializeCamera = (scene: Scene) => {
  const camera = new BABYLON.ArcRotateCamera(
    'camera_map',
    -Math.PI / 2,
    Math.PI / 4,
    15,
    new BABYLON.Vector3(0, 0, 0),
    scene
  );

  var ground = BABYLON.MeshBuilder.CreateGround(
    'ground',
    { width: 50, height: 50 },
    scene
  );
  // Hidden ground, just being used for panning help
  ground.setEnabled(false);

  let pickOrigin: any;
  let isPanning = false;
  scene.onPointerDown = evt => {
    var pickResult = scene.pick(scene.pointerX, scene.pointerY, m => {
      return m.name === 'ground';
    });
    if (pickResult?.pickedPoint) {
      pickOrigin = pickResult.pickedPoint;
      isPanning = true;
    }
  };

  scene.onPointerUp = () => {
    isPanning = false;
  };

  scene.onPointerMove = () => {
    if (isPanning) {
      var pickResult = scene.pick(scene.pointerX, scene.pointerY, m => {
        return m.name === 'ground';
      });
      if (pickResult?.pickedPoint) {
        let diff = pickResult.pickedPoint.subtract(pickOrigin);

        diff.y = 0; // Disable Y-axis panning.

        camera.target.subtractInPlace(diff);
      }
    }
  };

  return camera;
};

const initializeMeshes = (scene: Scene, sharedBabylonObject: any) => {
  // Hide every hex
  [...Array(5)].forEach((_, ring) =>
    [...Array(6 * (ring + 1))].forEach((_, index) => {
      const tmpMesh = scene.getMeshByName(`hex_${ring + 1}_${index}`);
      if (tmpMesh) {
        tmpMesh.setEnabled(false);
      }
    })
  );

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

  // Reset camera
  const camera = scene.getCameraByName('camera_map') as BABYLON.ArcRotateCamera;
  if (camera) {
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.radius = 15;
  }

  // Initialize colors for the last ring
  [...Array(6 * 5)].forEach((_, index) => {
    (
      scene.getMeshByName(`hex_${5}_${index}`) || { material: null }
    ).material = scene.getMaterialByName('material_lathe');
    scene.getMeshByName(`hex_${5}_${index}`)?.setEnabled(true);
  });

  incrementalHexes.forEach(hexName => {
    let tmpMaterial = scene.getMaterialByName(`material_${hexName}`);
    let tmpMesh = scene.getMeshByName(hexName);
    if (tmpMaterial && tmpMesh) {
      tmpMesh.material = tmpMaterial;

      let textTexture = new BABYLON.DynamicTexture(
        `text_${hexName}`,
        { width: 100, height: 100 },
        scene,
        false
      );
      textTexture.wAng = -Math.PI / 2;
      (tmpMaterial as BABYLON.StandardMaterial).diffuseTexture = textTexture;

      textTexture.drawText('', null, null, font, 'green', 'white', true, true);
    }
  });

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
              sharedBabylonObject.current.ui.openIncremental(
                `hex_${5}_${index}`
              );
            }
          ),
        ])
      );
    }
  });
};

export const onRenderSecondStage = (scene: Scene, sharedBabylonObject: any) => {
  // Enable parent node
  scene.getNodeByName('secondStageParent')?.setEnabled(true);

  Object.keys(sharedBabylonObject?.current.modalHexValues || {}).forEach(
    hexName => {
      scene.getMeshByName(hexName)?.setEnabled(true);
      // Hide bottom if exists
      scene.getMeshByName(`${hexName}_bottom`)?.setEnabled(false);
    }
  );

  // Unlock corners if valid
  cornersAndUnlockHex.forEach(([corner, unlockHex]) => {
    if ((sharedBabylonObject?.current.modalHexValues || {})[unlockHex]) {
      const cornerMesh = scene.getMeshByName(corner);

      // if enabling for the firt time
      if (cornerMesh && !cornerMesh.isEnabled()) {
        cornerMesh.isPickable = true;
        cornerMesh.setEnabled(true);

        updateHexText(cornerMesh.material?.name || '', scene, '?');
      }
    }
  });
};

const createMaterials = (scene: Scene) => {
  new BABYLON.StandardMaterial(
    'material_central',
    scene
  ).ambientColor = BABYLON.Color3.FromHexString(
    babylonTheme.colors.map.central
  );

  new BABYLON.StandardMaterial(
    'material_lathe',
    scene
  ).ambientColor = BABYLON.Color3.FromHexString(babylonTheme.colors.map.border);

  new BABYLON.StandardMaterial(
    'material_common_hex',
    scene
  ).ambientColor = BABYLON.Color3.FromHexString(babylonTheme.colors.map.common);

  new BABYLON.StandardMaterial(
    'material_border_hex',
    scene
  ).ambientColor = BABYLON.Color3.FromHexString(babylonTheme.colors.map.border);

  // Materials
  new BABYLON.StandardMaterial(
    'material_incremental',
    scene
  ).ambientColor = BABYLON.Color3.FromHexString(
    babylonTheme.colors.map.incremental
  );

  new BABYLON.StandardMaterial(
    'material_trade',
    scene
  ).ambientColor = BABYLON.Color3.FromHexString(babylonTheme.colors.map.trade);

  new BABYLON.StandardMaterial(
    'material_expand',
    scene
  ).ambientColor = BABYLON.Color3.FromHexString(babylonTheme.colors.map.expand);

  new BABYLON.StandardMaterial(
    'material_bottom',
    scene
  ).ambientColor = BABYLON.Color3.FromHexString(babylonTheme.colors.map.bottom);

  // Create unique material for each incremental (for dynamic texture)
  incrementalHexes.forEach(hexName => {
    new BABYLON.StandardMaterial(
      `material_${hexName}`,
      scene
    ).ambientColor = BABYLON.Color3.FromHexString(
      babylonTheme.colors.map.incremental
    );
  });
};

const updateHexText = (hexName: string, scene: Scene, text: string) => {
  let tmpMaterial = scene.getMaterialByName(
    hexName
  ) as BABYLON.StandardMaterial;
  const textTexture = tmpMaterial?.diffuseTexture as BABYLON.DynamicTexture;
  if (textTexture) {
    textTexture.drawText(text, null, null, font, 'black', 'white', true, true);
  }
};

const updateValuePerSecondText = (scene: any) => (
  name: string,
  value: number
) => {
  updateHexText(`material_${name}`, scene, `${~~value}/s`);
};

const clearHexText = (scene: any) => (name: string) => {
  updateHexText(`material_${name}`, scene, '');
};

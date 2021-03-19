import * as BABYLON from '@babylonjs/core';
import { Scene } from '@babylonjs/core';
import { babylonTheme } from '../helpers/theme';

export const createMaterials = (scene: Scene) => {
  new BABYLON.StandardMaterial(
    'central_hex',
    scene
  ).ambientColor = BABYLON.Color3.FromHexString(
    babylonTheme.colors.map.central
  );

  new BABYLON.StandardMaterial(
    'material_expand',
    scene
  ).ambientColor = BABYLON.Color3.FromHexString(babylonTheme.colors.map.expand);

  new BABYLON.StandardMaterial(
    'material_break_free',
    scene
  ).ambientColor = BABYLON.Color3.FromHexString('#ff0000');
};

export const changeLatheVisual = (
  lathe: BABYLON.AbstractMesh,
  material: string
) => {
  const scene = lathe.getScene();

  lathe.material = scene.getMaterialByName(material);
};

// It's equals to lathe logic but separated for now
export const changeHexVisual = (
  hex: BABYLON.AbstractMesh,
  material: string
) => {
  const scene = hex.getScene();

  hex.material = scene.getMaterialByName(material);
};

import * as BABYLON from '@babylonjs/core';
import { Scene } from '@babylonjs/core';
import { babylonTheme } from '../helpers/theme';
import { convertToColor4IfNecessary } from '../helpers/utils';

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
  type: string
) => {
  const colors: { [index: string]: string } = {
    default: '#000000ff',
    break_free: '#ff0000ff',
    expand: babylonTheme.colors.map.expand,
  };

  lathe.instancedBuffers.color = BABYLON.Color4.FromHexString(
    convertToColor4IfNecessary(colors[type])
  );
};

// It's equals to lathe logic but separated for now
export const changeHexVisual = (
  hex: BABYLON.AbstractMesh,
  variant: string | number
) => {
  const colors: { [index: string]: string } = {
    central_hex: babylonTheme.colors.map.central,
  };

  let color: string;
  if (typeof variant === 'number') {
    color = babylonTheme.colors.flip[variant % 5];
  } else {
    color = colors[variant];
  }

  hex.instancedBuffers.color = BABYLON.Color4.FromHexString(
    convertToColor4IfNecessary(color)
  );
};

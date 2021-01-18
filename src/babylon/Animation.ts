import * as BABYLON from '@babylonjs/core';

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

export const xRotation = rotationAnimation('rotation.x');
export const ySlide = translationAnimation('position.y');

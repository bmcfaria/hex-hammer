import { useEffect, useRef } from 'react';
import { Engine, EngineOptions, Scene, SceneOptions } from '@babylonjs/core';
import { GameObjectRefType } from './helpers/types';

export type BabylonjsProps = {
  antialias?: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  renderChildrenWhenReady?: boolean;
  sceneOptions?: SceneOptions;
  onSceneReady: (scene: Scene) => void;
  onSceneReady1: (scene: Scene) => void;
  onRender?: (scene: Scene) => void;
  onRenderSecondStage?: (
    scene: Scene,
    sharedBabylonObject: { current?: GameObjectRefType }
  ) => void;
  id: string;
  sharedBabylonObject: { current?: GameObjectRefType };
  children?: React.ReactNode;
};

const Babylon = (props: BabylonjsProps) => {
  const reactCanvas = useRef(null);
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onRenderSecondStage,
    onSceneReady,
    onSceneReady1,
    sharedBabylonObject,
    ...rest
  } = props;

  useEffect(() => {
    if (reactCanvas.current) {
      const engine = new Engine(
        reactCanvas.current,
        antialias,
        engineOptions,
        adaptToDeviceRatio
      );
      const incrementalScene = new Scene(engine, sceneOptions);
      const secondStageScene = new Scene(engine, sceneOptions);

      if (incrementalScene.isReady()) {
        props.onSceneReady(incrementalScene);
      } else {
        incrementalScene.onReadyObservable.addOnce(scene =>
          props.onSceneReady(scene)
        );
      }

      if (secondStageScene.isReady()) {
        props.onSceneReady1(secondStageScene);
      } else {
        secondStageScene.onReadyObservable.addOnce(secondStageScene =>
          props.onSceneReady1(secondStageScene)
        );
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === 'function') {
          onRender(incrementalScene);
        }
        if (typeof onRenderSecondStage === 'function') {
          onRenderSecondStage(secondStageScene, sharedBabylonObject);
        }

        // console.log(sharedBabylonObject.current.scene);

        switch (sharedBabylonObject.current?.scene) {
          case 'incremental':
            incrementalScene.render();
            break;
          default:
            // console.log('rendering scene 0');
            secondStageScene.render();
        }

        // scene.render();
        // scene1.render();
      });
      const resize = () => {
        incrementalScene.getEngine().resize();
      };
      if (window) {
        window.addEventListener('resize', resize);
      }
      return () => {
        incrementalScene.getEngine().dispose();
        if (window) {
          window.removeEventListener('resize', resize);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactCanvas]);

  return (
    <canvas
      ref={reactCanvas}
      style={{
        width: '100%',
        height: '100%',
      }}
      {...rest}
    />
  );
};

export default Babylon;

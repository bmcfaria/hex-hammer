import { useContext, useEffect, useRef } from 'react';
import { Engine, EngineOptions, Scene, SceneOptions } from '@babylonjs/core';
import createScene, {
  updateIncrementalState,
} from './babylon/incrementalStage';
import { GameObjectContext } from './helpers/context';
import {
  createSceneSecondStage,
  onRenderSecondStage,
} from './babylon/sceneSecondStage';

type BabylonjsProps = {
  antialias?: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  renderChildrenWhenReady?: boolean;
  sceneOptions?: SceneOptions;
  onRender?: (scene: Scene) => void;
  id: string;
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
    ...rest
  } = props;

  const { gameObject } = useContext(GameObjectContext);

  const onSceneReady = createScene(gameObject);
  const onSceneReady1 = createSceneSecondStage(gameObject);

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
        onSceneReady(incrementalScene);
      } else {
        incrementalScene.onReadyObservable.addOnce(scene =>
          onSceneReady(scene)
        );
      }

      if (gameObject?.current) {
        gameObject.current.updateIncrementalState = total => {
          updateIncrementalState(incrementalScene, total, gameObject);
        };
      }

      if (secondStageScene.isReady()) {
        onSceneReady1(secondStageScene);
      } else {
        secondStageScene.onReadyObservable.addOnce(secondStageScene =>
          onSceneReady1(secondStageScene)
        );
      }

      engine.runRenderLoop(() => {
        switch (gameObject?.current?.scene) {
          case 'incremental':
            if (typeof onRender === 'function') {
              onRender(incrementalScene);
            }
            incrementalScene.render();
            break;
          default:
            if (typeof onRenderSecondStage === 'function' && gameObject) {
              onRenderSecondStage(secondStageScene, gameObject);
            }
            // Update FPS
            if (typeof onRender === 'function') {
              onRender(secondStageScene);
            }
            secondStageScene.render();
        }
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

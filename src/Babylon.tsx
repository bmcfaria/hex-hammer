import { useEffect, useRef } from 'react';
import { Engine, EngineOptions, Scene, SceneOptions } from '@babylonjs/core';

export type BabylonjsProps = {
  antialias?: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  renderChildrenWhenReady?: boolean;
  sceneOptions?: SceneOptions;
  onSceneReady: (scene: Scene) => void;
  onSceneReady1: (scene: Scene) => void;
  onRender?: (scene: Scene) => void;
  id: string;
  sharedBabylonObject: any;
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
      const scene = new Scene(engine, sceneOptions);
      const scene1 = new Scene(engine, sceneOptions);

      if (scene.isReady()) {
        props.onSceneReady(scene);
      } else {
        scene.onReadyObservable.addOnce(scene => props.onSceneReady(scene));
      }

      if (scene1.isReady()) {
        props.onSceneReady1(scene1);
      } else {
        scene1.onReadyObservable.addOnce(scene1 => props.onSceneReady1(scene1));
      }

      engine.runRenderLoop(() => {
        if (typeof onRender === 'function') {
          onRender(scene);
        }

        // console.log(sharedBabylonObject.current.scene);

        switch (sharedBabylonObject.current.scene) {
          case 1:
            // console.log('rendering scene 1');
            scene.render();
            break;
          default:
            // console.log('rendering scene 0');
            scene1.render();
        }

        // scene.render();
        // scene1.render();
      });
      const resize = () => {
        scene.getEngine().resize();
      };
      if (window) {
        window.addEventListener('resize', resize);
      }
      return () => {
        scene.getEngine().dispose();
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

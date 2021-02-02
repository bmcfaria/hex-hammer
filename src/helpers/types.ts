export type SceneType = 'incremental' | 'secondStage';

export interface GameObjectRefType {
  mainAction: () => void;
  changeScene: (scene: SceneType) => void;
  scene: SceneType;
  inc: {
    main: 0;
    update: () => void;
  };
  ui: {
    modal: true;
  };
}

export interface GameObjectType {
  gameObject?: { current?: GameObjectRefType };
  scene?: SceneType;
}

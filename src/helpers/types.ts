import { ModalHexTypes } from './values';

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
    openModal: (id: ModalHexTypes) => void;
  };
}

export interface GameObjectType {
  gameObject?: { current?: GameObjectRefType };
  scene?: SceneType;
}

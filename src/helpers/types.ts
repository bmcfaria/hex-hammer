import { ModalHexTypes } from './values';

export type SceneType = 'incremental' | 'secondStage';

export interface GameObjectRefType {
  mainAction: () => void;
  changeScene: (scene: SceneType, selectedHex?: string) => void;
  scene: SceneType;
  selectedHex?: string;
  inc: {
    hex_0_0: 0;
    update: (text: string) => void;
  };
  ui: {
    openModal: (id: ModalHexTypes) => void;
  };
}

export interface GameObjectType {
  gameObject?: { current?: GameObjectRefType };
  scene?: SceneType;
}

import theme from './theme';
import { ModalHexTypes } from './values';

export type SceneType = 'incremental' | 'secondStage';

export interface GameObjectRefType {
  mainAction: (total: number) => void;
  changeScene: (scene: SceneType, selectedHex?: string) => void;
  updateIncrementalState: (total: number) => void;
  reset: () => void;
  scene: SceneType;
  selectedHex?: string;
  inc: {
    hex_0_0: 0;
    update: (name: string, value: number) => void;
    clearText: (name: string) => void;
  };
  ui: {
    openModal: (id: ModalHexTypes) => void;
    openIncremental: (id: string) => void;
    zoomIn: () => void;
    zoomOut: () => void;
  };
  sceneInitialization: {
    incrementalScene: () => void;
    secondStageScene: () => void;
  };
  sceneDisable: {
    incrementalScene: () => void;
    secondStageScene: () => void;
  };
  modalHexValues: { [index: string]: boolean };
}

export interface GameObjectType {
  gameObject?: { current?: GameObjectRefType };
  scene?: SceneType;
}

export type CurrencyType = keyof typeof theme.currencyColors;

export type UpgradeCategoryType = 'incrementals' | 'trade';

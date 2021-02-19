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
  };
  ui: {
    openModal: (id: ModalHexTypes) => void;
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
}

export interface GameObjectType {
  gameObject?: { current?: GameObjectRefType };
  scene?: SceneType;
}

export type CurrenciesTypes = keyof typeof theme.currencyColors;

export type UpgradeCategoryTypes = 'incrementals' | 'trade';

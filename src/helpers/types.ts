import theme from './theme';
import { ModalHexType } from './values';

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
    openModal: (id: ModalHexType) => void;
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
  // To help synchronization
  incrementalLastCounter: { [index: string]: boolean | undefined };
}

export interface GameObjectType {
  gameObject?: { current?: GameObjectRefType };
  scene?: SceneType;
}

export type CurrencyType = keyof typeof theme.currencyColors;

export type UpgradeCategoryType = 'incrementals' | 'trade';

export interface BonusType {
  name: string;
  type: 'atRing';
  value: number;
  reward: {
    type: 'currency';
    key: CurrencyType;
    value: number;
  };
}

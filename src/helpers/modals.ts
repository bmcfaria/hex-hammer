import stringsObject from './strings.json';
import {
  ModalExpandType,
  ModalTradeType,
  ModalUnlockType,
  ModalUpgradeType,
} from './types';

type CombinedModalsType =
  | ModalExpandType
  | ModalTradeType
  | ModalUnlockType
  | ModalUpgradeType;

export const modalsHex: { [index: string]: CombinedModalsType } = {
  hex_2_0: {
    name: 'hex_2_0',
    title: stringsObject.modal.expand.title,
    description: stringsObject.modal.expand.description,
    type: 'expand',
    currency: 'blue',
    prices: [6, 20],
    minReality: 2,
  },
  hex_2_2: {
    name: 'hex_2_2',
    title: stringsObject.modal.expand.title,
    description: stringsObject.modal.expand.description,
    type: 'expand',
    currency: 'blue',
    prices: [6, 20],
    minReality: 1,
  },
  hex_2_4: {
    name: 'hex_2_4',
    title: stringsObject.modal.expand.title,
    description: stringsObject.modal.expand.description,
    type: 'expand',
    currency: 'blue',
    prices: [6, 20],
    minReality: 2,
  },
  hex_2_6: {
    name: 'hex_2_6',
    title: stringsObject.modal.expand.title,
    description: stringsObject.modal.expand.description,
    type: 'expand',
    currency: 'blue',
    prices: [6, 20],
    minReality: 0,
  },
  hex_2_8: {
    name: 'hex_2_8',
    title: stringsObject.modal.expand.title,
    description: stringsObject.modal.expand.description,
    type: 'expand',
    currency: 'blue',
    prices: [6, 20],
    minReality: 2,
  },
  hex_2_10: {
    name: 'hex_2_10',
    title: stringsObject.modal.expand.title,
    description: stringsObject.modal.expand.description,
    type: 'expand',
    currency: 'blue',
    prices: [6, 20],
    minReality: 1,
  },
  hex_2_5: {
    name: 'hex_2_5',
    title: stringsObject.modal.trade.title,
    description: stringsObject.modal.trade.description,
    type: 'trade',
    currency: 'base',
    convertTo: 'blue',
    rate: 2,
    prices: [],
    minReality: 2,
  },
  hex_4_22: {
    name: 'hex_4_22',
    title: stringsObject.modal.trade.title,
    description: stringsObject.modal.trade.description,
    type: 'trade',
    currency: 'base',
    convertTo: 'blue',
    rate: 2,
    prices: [],
    minReality: 3,
  },
  hex_2_1: {
    name: 'hex_2_1',
    title: stringsObject.modal.upgrade.title,
    description: stringsObject.modal.upgrade.description,
    lockIndex: 1,
    type: 'upgrade',
    upgrade: 'increment',
    currency: 'base',
    prices: [100],
    minReality: 2,
  },
  hex_2_9: {
    name: 'hex_2_9',
    title: stringsObject.modal.upgrade.title,
    description: stringsObject.modal.upgrade.description,
    lockIndex: 1,
    type: 'upgrade',
    upgrade: 'auto',
    currency: 'base',
    prices: [100],
    minReality: 2,
  },
  hex_4_2: {
    name: 'hex_4_2',
    title: stringsObject.modal.upgrade.title,
    description: stringsObject.modal.upgrade.description,
    lockIndex: 1,
    type: 'upgrade',
    upgrade: 'increment',
    currency: 'base',
    prices: [100],
    minReality: 3,
  },
  hex_4_10: {
    name: 'hex_4_10',
    title: stringsObject.modal.upgrade.title,
    description: stringsObject.modal.upgrade.description,
    lockIndex: 1,
    type: 'upgrade',
    upgrade: 'interval',
    currency: 'base',
    prices: [100],
    minReality: 3,
  },
  hex_4_14: {
    name: 'hex_4_14',
    title: stringsObject.modal.upgrade.title,
    description: stringsObject.modal.upgrade.description,
    lockIndex: 1,
    type: 'upgrade',
    upgrade: 'auto',
    currency: 'base',
    prices: [100],
    minReality: 3,
  },
  hex_5_0: {
    name: 'hex_5_0',
    title: stringsObject.modal.unlock.title,
    description: stringsObject.modal.unlock.description,
    type: 'unlock',
    currency: 'red',
    prices: [100],
    minReality: 0,
  },
  hex_5_15: {
    name: 'hex_5_15',
    title: stringsObject.modal.unlock.title,
    description: stringsObject.modal.unlock.description,
    type: 'unlock',
    currency: 'base',
    prices: [100],
    minReality: 0,
  },
};

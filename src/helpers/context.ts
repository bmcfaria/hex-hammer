import { createContext } from 'react';
import { GameObjectType } from './types';

export const GameObjectContext = createContext<GameObjectType>({});

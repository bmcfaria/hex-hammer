import { createContext } from 'react';
import { GameObjectType, SidebarType } from './types';

export const GameObjectContext = createContext<GameObjectType>({});
export const SidebarContext = createContext<SidebarType>({});

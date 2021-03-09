import { createContext } from 'react';
import { GameContextType, ModalContextType, SidebarContextType } from './types';

export const GameObjectContext = createContext<GameContextType>({});
export const ModalContext = createContext<ModalContextType>({});
export const SidebarContext = createContext<SidebarContextType>({});

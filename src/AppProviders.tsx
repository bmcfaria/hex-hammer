import { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import './App.css';
import { initialState, reducer } from './state/reducer';
import { GameObjectContext, ModalContext } from './helpers/context';
import { GameObjectRefType, ModalHexType, SceneType } from './helpers/types';
import { initializeGameObject } from './helpers/gameObject';

const inDev = process.env.NODE_ENV === 'development';
const composeEnhancers =
  (inDev && window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const store = createStore(reducer, initialState, composeEnhancers());

interface AppProvidersProps {
  children?: React.ReactNode;
}

function AppProviders({ children }: AppProvidersProps) {
  const sharedBabylonObject = useRef<GameObjectRefType>();
  initializeGameObject(sharedBabylonObject);

  const [scene, setScene] = useState<SceneType>('incremental');
  const [modal, setModal] = useState<ModalHexType>();

  useEffect(() => {
    if (sharedBabylonObject.current) {
      sharedBabylonObject.current.changeScene = (tmpScene, selectedHex) => {
        if (sharedBabylonObject.current) {
          sharedBabylonObject.current.scene = tmpScene;
          sharedBabylonObject.current.selectedHex = selectedHex;
          sharedBabylonObject.current.sceneDisable.secondStageScene();
        }

        setScene(tmpScene);
      };
    }
  }, [sharedBabylonObject]);

  return (
    <Provider store={store}>
      <GameObjectContext.Provider
        value={{ gameObject: sharedBabylonObject, scene: scene }}
      >
        <ModalContext.Provider value={{ modal, setModal }}>
          {children}
        </ModalContext.Provider>
      </GameObjectContext.Provider>
    </Provider>
  );
}

export default AppProviders;

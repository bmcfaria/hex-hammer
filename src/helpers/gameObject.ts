export const initializeGameObject = (gameObject: any) => {
  // Initialize
  if (!gameObject.current) {
    gameObject.current = {};
    gameObject.current.scene = 'incremental';
    gameObject.current.selectedHex = 'hex_0_0';
    gameObject.current.changeScene = undefined;
    gameObject.current.updateIncrementalState = undefined;

    gameObject.current.inc = {};
    gameObject.current.inc.update = undefined;
    gameObject.current.inc.clearText = undefined;

    gameObject.current.ui = {};
    gameObject.current.ui.openModal = undefined;
    gameObject.current.ui.openIncremental = undefined;
    gameObject.current.ui.zoomIn = undefined;
    gameObject.current.ui.zoomOut = undefined;
    gameObject.current.ui.center = undefined;
    gameObject.current.ui.setSecondStageCoordinates = undefined;

    gameObject.current.modalHexValues = {};

    gameObject.current.sceneInitialization = {};
    gameObject.current.sceneInitialization.incrementalScene = undefined;
    gameObject.current.sceneInitialization.secondStageScene = undefined;
    gameObject.current.reset = () => {
      gameObject.current.sceneInitialization.incrementalScene?.();
      gameObject.current.sceneInitialization.secondStageScene?.();

      gameObject.current.scene = 'incremental';
      gameObject.current.selectedHex = 'hex_0_0';
      gameObject.current.inc = {
        update: gameObject.current.inc.update,
      };
    };
    gameObject.current.sceneDisable = {
      secondStageScene: undefined,
    };
    gameObject.current.incrementalLastCounter = {};
  }
};

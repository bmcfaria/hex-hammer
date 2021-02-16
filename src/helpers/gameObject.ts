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

    gameObject.current.ui = {};
    gameObject.current.ui.openModal = undefined;
    gameObject.current.ui.zoomIn = undefined;
    gameObject.current.ui.zoomOut = undefined;
  }
};

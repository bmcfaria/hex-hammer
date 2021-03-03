const baseColors = {
  blue: '#3D5A80',
  lightBlue: '#98C1D9',
  whiteBlue: '#E0FBFC',
  orange: '#EE6C4D',
  darkBlue: '#293241',
};

const theme = {
  zIndex: { sidebar: 1, statusBar: 10, mainButton: 60, pauseModal: 100 },
  currencyColors: {
    base: 'white',
    red: baseColors.orange,
    blue: baseColors.lightBlue,
    dark: baseColors.darkBlue,
  },
  colors: {
    hammerButton: {
      border: baseColors.darkBlue,
      background: baseColors.darkBlue,
      backgroundAuto: baseColors.whiteBlue,
      backgroundFill: baseColors.lightBlue,
    },
    statusBar: {
      background: baseColors.darkBlue,
      buttons: {
        background: 'white',
        backgroundHover: 'white',
        backgroundActive: baseColors.blue,
        border: 'black',
        borderHover: baseColors.orange,
        borderActive: baseColors.whiteBlue,
        icon: 'black',
        iconHover: baseColors.orange,
        iconActive: 'white',
      },
    },
    statusBarScreenControls: {
      background: 'white',
      border: baseColors.darkBlue,
    },
    statusBarNotifications: {
      background: 'white',
      border: baseColors.darkBlue,
    },
    sidebar: {
      background: baseColors.whiteBlue,
      border: baseColors.darkBlue,
    },
    upgradeButtons: {
      border: baseColors.darkBlue,
      borderHover: baseColors.orange,
      icon: 'black',
      iconHover: baseColors.orange,
    },
    modal: {
      background: 'white',
      backgroundSecondary: baseColors.whiteBlue,
      border: baseColors.darkBlue,
      expandHex: '#0000ff',
      infoOddBackground: baseColors.whiteBlue,
    },
  },
  boxShadow: 'box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);',
};

export const babylonTheme = {
  colors: {
    clearColor: {
      incremental: '#888888ff',
      secondStage: '#222222ff',
    },
    ambientColor: {
      incremental: '#ffffff',
      secondStage: '#ffffff',
    },
    flip: ['#eae2b7', '#fcbf49', '#f77f00', '#d62828', '#003049'],
    map: {
      central: '#ff0000',
      border: '#000000',
      common: '#ffffff',
      incremental: '#ff0000',
      trade: '#00ff00',
      expand: '#0000ff',
      bottom: '#293241',
    },
  },
};

export const resetButtonStyles = `
  border: none;
  padding: 0;
  background: none;
  outline: none;
  font: unset;
`;

export default theme;

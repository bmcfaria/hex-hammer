const baseColors = {
  blue: '#3D5A80',
  lightBlue: '#98C1D9',
  whiteBlue: '#E0FBFC',
  orange: '#EE6C4D',
  darkBlue: '#293241',
  gray: '#C4C4C4',
};

const theme = {
  zIndex: {
    sidebar: 1,
    statusBar: 10,
    mainButton: 60,
    modal: 100,
    pauseModal: 100,
  },
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
      background: baseColors.darkBlue,
      borderTop: baseColors.whiteBlue,
      borderLeft: baseColors.whiteBlue,
      borderLeftOut: baseColors.darkBlue,
    },
    upgradeButtons: {
      containerBackground: baseColors.whiteBlue,
      containerBackgroundDisabled: baseColors.gray,
      border: baseColors.whiteBlue,
      borderHover: baseColors.orange,
      icon: 'black',
      iconHover: baseColors.orange,
    },
    modal: {
      backgroundShadow: '#0000007d',
      background: 'white',
      backgroundSecondary: baseColors.whiteBlue,
      border: baseColors.darkBlue,
      expandHex: baseColors.lightBlue,
      infoOddBackground: baseColors.whiteBlue,
      checkmark: baseColors.darkBlue,
    },
    tutorial: {
      textContainer: {
        background: 'white',
        border: baseColors.darkBlue,
      },
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
      upgrade: '#FFFF00',
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
  cursor: pointer;
`;

export default theme;

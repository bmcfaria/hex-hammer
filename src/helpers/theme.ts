const baseColors = {
  blue: '#3D5A80',
  lightBlue: '#98C1D9',
  whiteBlue: '#E0FBFC',
  orange: '#EE6C4D',
  darkBlue: '#293241',
};

const theme = {
  zIndex: { statusBar: 10 },
  currencyColors: {
    base: 'white',
    red: 'red',
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
  },
  boxShadow: 'box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);',
};

export default theme;

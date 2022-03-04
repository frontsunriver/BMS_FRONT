import {DefaultTheme} from 'react-native-paper';
import colors from '../Colors';

const theme = {
  ...DefaultTheme,
  id: 1,
  dark: false,
  roundness: 7,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.white,
    accent: '#a5be00',
    background: '#2695F0',
    text: '#2695F0',
    placeholder: colors.white,
    header: '#5c80bc',
    headerTitle: colors.white,
    surface: colors.white,
    primaryText: '#2695F0',
    defaultText: colors.white,
  },
};

export default theme;

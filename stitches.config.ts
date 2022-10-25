import { createStitches } from '@stitches/react';

export const MAIN_ACCENT = '#E83C77';
export const COLORS = {
  accent: MAIN_ACCENT,
  background: '#EFF0F6',
  subWhite1: '#F6F7FA',
  subWhite2: '#EFF0F6',
  gray1: '#E4E6EE',
  gray2: '#C3C6D2',
  gray3: '#8D90A0',
  gray4: '#6B7085',
  gray5: '#505363',
  gray6: '#3D404A',
  subBlack: '#202228',
  blue: '#8099FF',
};

export const {
  styled,
  css,
  globalCss,
  keyframes,
  getCssText,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: COLORS,
  },
  utils: {
    fontL: () => ({
      fontSize: '1.8rem',
    }),
    fontS: () => ({
      fontSize: '1.4rem',
    }),
  },
});

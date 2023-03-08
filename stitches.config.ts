import { createStitches } from '@stitches/react';

export const MAIN_ACCENT = '#E83C77';
export const COLORS = {
  accent: MAIN_ACCENT,
  grade1: '#FEFEFF',
  grade2: '#F6F7FA',
  grade3: '#EFF0F6',
  grade4: '#E4E6EE',
  grade5: '#C3C6D2',
  grade6: '#8D90A0',
  grade7: '#6B7085',
  grade8: '#505363',
  grade9: '#3D404A',
  grade10: '#202228',
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

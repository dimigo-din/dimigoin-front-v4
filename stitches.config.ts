import { createStitches } from '@stitches/react';

export const MAIN_ACCENT = '#FF3284';
export const COLORS = {
  accent: MAIN_ACCENT,
  background: '#E5E5E5',
  gray1: '#A6ABC0',
  gray2: '#D1D3DD',
  gray3: '#F1F2F5',
  gray4: '#F6F7FB',
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
    colors: COLORS
  },
  utils: {
    fontL: () => ({
      fontSize: '1.8rem'
    }),
    fontS: () => ({
      fontSize: '1.4rem'
    })
  },
});

import { styled } from '#/stitches.config';

export const CustomText1 = styled('span', {
  fontSize: '1.6rem',
  lineHeight: '1.9rem',
  position: 'relative',
  variants: {
    active: {
      true: {
        color: '$accent',
        fontWeight: 700,
      },
      false: {
        color: '$gray3',
        fontWeight: 500,
      },
    },
    button: {
      true: {
        cursor: 'pointer',
      },
    },
  },
});

export const CustomText2 = styled('span', {
  fontSize: '1.6rem',
  lineHeight: '2.2rem',
  position: 'relative',
  variants: {
    active: {
      true: {
        color: '$black2',
        fontWeight: 700,
      },
      false: {
        color: '$gray1',
        fontWeight: 500,
      },
    },
    button: {
      true: {
        cursor: 'pointer',
      },
    },
  },
});

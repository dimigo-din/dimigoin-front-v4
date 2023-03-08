import { styled } from '#/stitches.config';

export const CustomText = styled('span', {
  fontSize: '1.6rem',
  lineHeight: '1.9rem',
  position: 'relative',
  variants: {
    active: {
      true: {
        color: '$accent',
        fontWeight: '700 !important',
      },
      false: {
        color: '$grade5',
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

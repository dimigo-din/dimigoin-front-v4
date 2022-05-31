import { styled } from '#/stitches.config';

export const CustomText = styled('span', {
  lineHeight: '2.2rem',
  position: 'relative',
  variants: {
    active: {
      true: {
        color: '$accent',
        fontWeight: 700,
      },
      false: {
        color: '$gray1',
        fontWeight: 500,
      }
    },
    button: {
      true: {
        cursor: 'pointer',
      }
    }
  }
});
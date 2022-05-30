import { styled } from '#/stitches.config';

export const CustomText = styled('span', {
  lineHeight: '2.2rem',
  position: 'relative',
  variants: {
    active: {
      true: {
        color: '$accent',
      },
      false: {
        color: '$gray1',
      }
    },
    button: {
      true: {
        cursor: 'pointer',
      }
    }
  }
});
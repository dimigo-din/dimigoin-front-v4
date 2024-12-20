import { styled } from '#/stitches.config';

export const ButtonCustom = styled('button', {
  color: '#fff',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  margin: 0,
  padding: 0,
  borderRadius: '1rem',
  variants: {
    large: {
      true: {
        width: '100%',
        height: '5rem',
      },
      false: {
        width: '7.2rem',
        height: '3.6rem',
      },
    },
    active: {
      true: {
        backgroundColor: '$accent',
      },
      false: {
        backgroundColor: '$grade6',
      },
    },
  },
});
